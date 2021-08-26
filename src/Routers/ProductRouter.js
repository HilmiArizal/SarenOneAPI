const router = require('express').Router();
const { ProductController } = require('../Controllers');


// ADMIN
router.get('/getProduct', ProductController.getProduct);
router.post('/addProduct', ProductController.addProduct);
router.delete('/deleteProduct/:id', ProductController.deleteProduct);
router.put('/editProduct', ProductController.editProduct);

// USER
router.get('/getAllProduct', ProductController.getAllProduct);
router.get('/getProductByProductId/:id', ProductController.getProductByProductId);


module.exports = router;