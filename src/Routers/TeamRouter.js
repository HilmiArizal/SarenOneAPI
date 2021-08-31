const router = require('express').Router();
const { TeamController } = require('../Controllers');


router.get('/getTeam', TeamController.getTeam);
router.post('/addTeam', TeamController.addTeam);
router.put('/editTeam/:id', TeamController.editTeam);
router.delete('/deleteTeam/:id', TeamController.deleteTeam);


module.exports = router;