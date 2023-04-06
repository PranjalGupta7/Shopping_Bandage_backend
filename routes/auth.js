const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();


router.post('/registration', authController.registration);
router.post('/login',authController.login);
router.post('/token-verification', authController.token)

module.exports = router;
