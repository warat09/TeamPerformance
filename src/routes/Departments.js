const express = require('express')
const router = express.Router();
const controller = require('../controllers/Deparntment')

router.post("/AddDepartment", controller.AddDepartment);
router.post("/EditDepartment", controller.EditDepartment);
router.get("/AllJobDepartment", controller.AllJobDepartment)
router.get("/AllMemberDepartment", controller.AllMemberDepartment)
router.get("/AllDepartment", controller.AllDepartment)
router.get("/CheckMemberDepartment", controller.CheckMemberDepartment)

module.exports = router;


