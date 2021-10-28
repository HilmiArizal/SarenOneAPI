const router = require('express').Router();
const { UserController } = require('../Controllers');


router.put('/changeProfile/:id', UserController.changeProfile);
router.put('/changePassword/:id', UserController.changePassword);
router.get('/getAllUser', UserController.getAllUser);
router.get('/getUser', UserController.getUser);


module.exports = router;