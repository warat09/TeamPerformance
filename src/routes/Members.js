const express = require('express')
const router = express.Router();
const controller = require('../controllers/Member')

router.post("/AddMember", controller.AddMember);
router.post("/AddMemberToDepartment",controller.AddMemberToDepartment)
router.post("/AddMemberScore",controller.AddMemberScore);
router.post("/MemberScore",controller.MemberScore);



router.get("/OptionMember",controller.OptionMember);
router.get("/OptionMemberDepartment",controller.OptionMemberDepartment);
router.get("/AllScore",controller.AllScoreTable);




module.exports = router;