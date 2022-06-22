const express = require('express')
const router = express.Router();
const controller = require('../controllers/Job')

router.post("/AddJob", controller.AddJob);
router.get("/AddJobToDepartment",controller.AddJobToDepartment)
router.get("/OptionJob",controller.OptionJob)

module.exports = router;


