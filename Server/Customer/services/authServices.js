const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const UsersController = require("../controllers/authController");
// [checkAuth.verifyToken, checkAuth.isCustomer],

//For handling Get Requests
router.get("/allAccess", (req, res) => {
  res.status(200).send("Public Content.");
});

router.get(
  "/customerAccess",
  (req, res) => {
    res.status(200).send("Customer Content.");
  }
);

router.post("/register", UsersController.register);

router.post("/login", UsersController.login);

module.exports = router;
