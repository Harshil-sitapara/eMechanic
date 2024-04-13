const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const ServiceController = require("../controllers/serviceController");
// [checkAuth.verifyToken, checkAuth.isAdmin],

router.post(
  "/addService",
  ServiceController.addService
);

router.get("/findAll", ServiceController.findAll);

router.get("/findById/:serviceId", ServiceController.findByServiceId);
router.patch(
  "/updateService/:serviceId",
  ServiceController.updateService
);

router.delete(
  "/deleteService/:serviceId",
  ServiceController.deleteService
);
module.exports = router;
