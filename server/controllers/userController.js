const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const TOKEN_LIFESPAN = '15d';

class UserController {
  static async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const userModel = new User({ password: hashPassword, username });
      const user = await userModel.save();
      const userDto = {
        id: user._id,
        name: user.username,
      };
      const token = jwt.sign(userDto, process.env.JWT_SECRET, { expiresIn: TOKEN_LIFESPAN });
      res.json({ user: userDto, token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка. Попробуйте еще раз.' });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }
      const userDto = {
        id: user._id,
        name: user.username,
      };
      const token = jwt.sign(userDto, process.env.JWT_SECRET, { expiresIn: TOKEN_LIFESPAN });
      res.json({ user: userDto, token });
    } catch (e) {
      res.status(400).json({ message: 'Ошибка. Попробуйте еще раз.' });
    }
  }

  static async checkAuth(req, res) {
    try {
      const token = req.headers['x-access-token'];
      if (!token) {
        return res.status(400).json({ message: 'No token provided!' });
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(400).json({ message: 'Unauthorized!' });
        }
        const userDto = {
          id: decoded.id,
          name: decoded.name,
        };
        const token = jwt.sign(userDto, process.env.JWT_SECRET, { expiresIn: TOKEN_LIFESPAN });
        res.json({ user: userDto, token });
      });
    } catch (e) {
      res.status(400).json({ message: 'Authorization error' });
    }
  }
}

module.exports = UserController;
