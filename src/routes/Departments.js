const express = require('express')
const router = express.Router();
const controller = require('../controllers/Deparntment')

router.post("/AddDepartment", controller.AddDepartment);
router.get("/AllDepartment", controller.AllDepartment)

module.exports = router;


