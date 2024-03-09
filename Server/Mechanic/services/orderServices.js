const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const OrderController = require("../controllers/orderController");

router.patch(
  "/updateOrder/:orderId",
  OrderController.updateOrder
);

router.get(
  "/findInProcessOrders/:mechId",
  OrderController.findInProcessOrders
);

router.get(
  "/findMyOrders/:mechId",
  OrderController.findMyOrders
);

module.exports = router;
