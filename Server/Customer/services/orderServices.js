const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const OrderController = require("../controllers/orderController");
// [checkAuth.verifyToken, checkAuth.isCustomer],

router.get(
  "/findOrders/:customerId",
  OrderController.findMyOrders
);

module.exports = router;
