const router = require('express').Router();
const { StoreController } = require('../Controllers');

router.get('/getAllStore', StoreController.getAllStore);
router.get('/getStore', StoreController.getStore);
router.post('/addStore', StoreController.addStore); 
router.put('/editStore', StoreController.editStore); 
router.delete('/deleteStore/:id', StoreController.deleteStore); 

module.exports = router;