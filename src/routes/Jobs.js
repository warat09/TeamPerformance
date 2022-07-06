const express = require('express')
const router = express.Router();
const controller = require('../controllers/Job')

router.post("/AddJob", controller.AddJob);
router.post("/AddJobToDepartment",controller.AddJobToDepartment);
router.post("/AddJobScore",controller.AddJobScore);

router.get("/OptionJob",controller.OptionJob);
router.get("/OptionJobDepartment",controller.OptionJobDepartment);

module.exports = router;


