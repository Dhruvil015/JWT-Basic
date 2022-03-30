const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");
const authMiddlware = require('../middlewares/auth')

router.get("/dashboard",authMiddlware, mainController.dashboard);
router.post("/login", mainController.login);

module.exports = router;
