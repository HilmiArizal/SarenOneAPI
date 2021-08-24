const router = require('express').Router();
const { ProductController } = require('../Controllers');


router.get('/getProduct', ProductController.getProduct);
router.post('/addProduct', ProductController.addProduct);
router.delete('/deleteProduct/:id', ProductController.deleteProduct);
router.put('/editProduct', ProductController.editProduct);


module.exports = router;