const express = require('express')
const router = express.Router();
const controller = require('../controllers/Member')

router.post("/AddMember", controller.AddMember);
router.post("/AddMemberToDepartment",controller.AddMemberToDepartment)
router.post("/AddMemberScore",controller.AddMemberScore);

router.get("/OptionMember",controller.OptionMember);
router.get("/OptionMemberDepartment",controller.OptionMemberDepartment);



module.exports = router;