const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const OrderController = require("../controllers/orderController");
// [checkAuth.verifyToken, checkAuth.isAdmin],

router.get(
  "/findPlacedOrder",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  OrderController.findPlacedOrders
);

router.patch(
  "/updateOrder/:orderId",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  OrderController.updateOrder
);

module.exports = router;
