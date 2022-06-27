const express = require('express')
const router = express.Router();
const controller = require('../controllers/Member')

router.post("/AddMember", controller.AddMember);
router.post("/AddMemberToDepartment",controller.AddMemberToDepartment)
router.get("/OptionMember",controller.OptionMember);


module.exports = router;