const router = require('express').Router();
const { ProductController } = require('../Controllers');


router.get('/getProduct', ProductController.getProduct);
router.post('/addProduct', ProductController.addProduct);


module.exports = router;