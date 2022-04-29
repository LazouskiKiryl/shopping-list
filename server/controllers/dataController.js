const Purchase = require('../models/Purchase');
const List = require('../models/List');
const { listToDto, purchaseToDto } = require('../dto');

class DataController {
  static async getData(req, res) {
    try {
      const userId = req.userId;
      const lists = await List.find({ user: userId });
      const listDtos = lists.map(listToDto);
      const purchases = await Purchase.find({ user: userId });
      const purchaseDtos = purchases.map(purchaseToDto);
      res.json({ lists: listDtos, purchases: purchaseDtos });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async createPurchase(req, res) {
    try {
      const userId = req.userId;
      const { title, count, listId } = req.body;
      const list = await List.findOne({ user: userId, _id: listId });
      if (!list) {
        return res.status(400).json({ message: 'List is not found' });
      }
      const purchaseModel = new Purchase({
        user: userId,
        list: listId,
        title,
        count,
      });
      const purchase = await purchaseModel.save();
      res.json(purchaseToDto(purchase));
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async updatePurchase(req, res) {
    try {
      const userId = req.userId;
      const purchaseId = req.params.id;
      const { title, count, done } = req.body;
      const update = { title, count, done };
      const options = { new: true };
      const purchase = await Purchase.findOneAndUpdate(
        { user: userId, _id: purchaseId },
        update,
        options
      );
      res.json(purchaseToDto(purchase));
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async deletePurchase(req, res) {
    try {
      const userId = req.userId;
      const purchaseId = req.params.id;
      const purchase = await Purchase.findOneAndDelete({ user: userId, _id: purchaseId });
      res.json(purchaseToDto(purchase));
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async createList(req, res) {
    try {
      const userId = req.userId;
      const title = req.body.title;
      const listModel = new List({
        user: userId,
        title,
      });
      const list = await listModel.save();
      res.json(listToDto(list));
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async updateList(req, res) {
    try {
      const userId = req.userId;
      const listId = req.params.id;
      const { title } = req.body;
      const update = { title };
      const options = { new: true };
      const list = await List.findOneAndUpdate({ user: userId, _id: listId }, update, options);
      res.json(listToDto(list));
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async deleteList(req, res) {
    try {
      const userId = req.userId;
      const listId = req.params.id;
      await Purchase.deleteMany({ user: userId, list: listId });
      const list = await List.findOneAndDelete({ user: userId, _id: listId });
      res.json(listToDto(list));
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}

module.exports = DataController;
