const express = require('express')
const router = express.Router();
const controller = require('../controllers/Job')

router.post("/AddJob", controller.AddJob);
router.post("/AddJobToDepartment",controller.AddJobToDepartment);
router.post("/AddJobScore",controller.AddJobScore);
router.post("/RemoveJobScore",controller.RemoveJobScore);
router.post("/EditJob",controller.EditJob);
router.post("/DeleteJob",controller.DeleteJob);
router.get("/AllJob",controller.AllJob);
router.get("/OptionJob",controller.OptionJob);
router.get("/OptionJobDepartment",controller.OptionJobDepartment);
router.get("/OptionRemoveJobScore",controller.OptionRemoveJobScore);


module.exports = router;


