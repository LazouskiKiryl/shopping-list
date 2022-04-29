const Router = require('express').Router;
const router = new Router();
const { auth } = require('../middlewares');
const DataController = require('../controllers/dataController');

router.use(auth.verifyToken);

router.get('/', DataController.getData);

router.post('/purchase', DataController.createPurchase);
router.put('/purchase/:id', DataController.updatePurchase);
router.delete('/purchase/:id', DataController.deletePurchase);

router.post('/list', DataController.createList);
router.put('/list/:id', DataController.updateList);
router.delete('/list/:id', DataController.deleteList);

module.exports = router;
