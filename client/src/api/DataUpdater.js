import { v4 as uuid } from 'uuid';
import { store } from '../store';
import {
  addList,
  addPurchase,
  deleteList,
  deletePurchase,
  setIsUpdating,
  updateList,
  updatePurchase,
} from '../store/reducers/dataReducer';
import DataService from './DataService';

let requestCount = 0;

const requestStart = () => {
  if (requestCount === 0) {
    store.dispatch(setIsUpdating(true));
  }
  requestCount++;
};

const requestEnd = () => {
  requestCount--;
  if (requestCount === 0) {
    store.dispatch(setIsUpdating(false));
  }
};

const sendRequest = async (request) => {
  try {
    await request();
    requestEnd();
  } catch (e) {
    setTimeout(() => {
      sendRequest(request);
    }, 2000);
  }
};

class DataUpdater {
  static addList(title) {
    const tempId = uuid();
    const list = { id: tempId, title };
    requestStart();
    store.dispatch(addList(list));

    sendRequest(async () => {
      const response = await DataService.createList(title);
      store.dispatch(updateList(list, response.data.id));
    });
  }

  static updateList(id, title) {
    requestStart();
    store.dispatch(updateList({ id, title }));

    sendRequest(async () => {
      await DataService.updateList(id, title);
    });
  }

  static deleteList(id) {
    requestStart();
    store.dispatch(deleteList(id));

    sendRequest(async () => {
      await DataService.deleteList(id);
    });
  }

  static addPurchase(title, count, listId) {
    const tempId = uuid();
    const purchase = { id: tempId, title, count, listId };
    requestStart();
    store.dispatch(addPurchase(purchase));

    sendRequest(async () => {
      const response = await DataService.createPurchase(title, count, listId);
      store.dispatch(updatePurchase(purchase, response.data.id));
    });
  }

  static updatePurchase(purchase) {
    requestStart();
    store.dispatch(updatePurchase(purchase));

    sendRequest(async () => {
      await DataService.updatePurchase(purchase);
    });
  }

  static deletePurchase(id) {
    requestStart();
    store.dispatch(deletePurchase(id));

    sendRequest(async () => {
      await DataService.deletePurchase(id);
    });
  }
}

export default DataUpdater;
