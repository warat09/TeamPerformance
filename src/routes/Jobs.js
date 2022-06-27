const express = require('express')
const router = express.Router();
const controller = require('../controllers/Job')

router.post("/AddJob", controller.AddJob);
router.post("/AddJobToDepartment",controller.AddJobToDepartment)
router.get("/OptionJob",controller.OptionJob)

module.exports = router;


