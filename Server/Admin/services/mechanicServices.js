const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const MechanicController = require("../controllers/mechanicController");
  // [checkAuth.verifyToken, checkAuth.isAdmin],

router.get(
  "/findAvailable",
  MechanicController.findAvailable
);

router.get(
  "/findAll",
  MechanicController.findAll
);

module.exports = router;
