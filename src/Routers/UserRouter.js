const router = require('express').Router();
const { UserController } = require('../Controllers');


router.put('/changeProfile/:id', UserController.changeProfile);


module.exports = router;