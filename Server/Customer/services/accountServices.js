const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const AccountController = require("../controllers/accountController");
// [checkAuth.verifyToken, checkAuth.isCustomer],

router.get(
  "/findAll",
  AccountController.getAllCustomers
);

router.get("/findCustById/:custId", AccountController.findCustById);

router.patch(
  "/updateProfile/:custId",
  AccountController.updateProfile
);

router.delete(
  "/deleteAccount/:custId",
  AccountController.deleteCustomer
);

module.exports = router;
