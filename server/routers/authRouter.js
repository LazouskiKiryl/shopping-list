const Router = require('express').Router;
const router = new Router();
const UserController = require('../controllers/userController');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/check', UserController.checkAuth);

module.exports = router;
