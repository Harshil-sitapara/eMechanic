const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const AccountController = require("../controllers/accountController");

router.patch(
  "/update/:mechId",
  AccountController.updateProfile
);

router.delete(
  "/delete/:mechId",
  AccountController.deleteProfile
);

module.exports = router;
