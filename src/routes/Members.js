const express = require('express')
const router = express.Router();
const controller = require('../controllers/Member')

router.post("/AddMember", controller.AddMember);

module.exports = router;