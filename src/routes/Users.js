const express = require('express')
const router = express.Router();
const controller = require('../controllers/User')
const verifyToken = require('../middleware/auth')


router.post("/login",controller.Login)
router.get("/checktoken",verifyToken.verifitoken)
router.get("/getdatauser",controller.GetallData)


module.exports = router;