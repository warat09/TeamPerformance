const express = require('express')
const router = express.Router();
const controller = require('../controllers/User')
const verifyToken = require('../middleware/auth')


router.post("/register", controller.Register);
router.post("/login",controller.Login)

router.get("/checktoken",controller.Checktoken)

module.exports = router;