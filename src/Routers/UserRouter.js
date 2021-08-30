const router = require('express').Router();
const { UserController } = require('../Controllers');


router.put('/changeProfile/:id', UserController.changeProfile);
router.put('/changePassword/:id', UserController.changePassword);


module.exports = router;