const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const CarController = require("../controllers/carController");
  // [checkAuth.verifyToken, checkAuth.isAdmin],

//Add Car
router.post(
  "/addCar",
  CarController.addCar
);

router.get("/findAll", CarController.findAllCars);

//FInd All Brands
router.get("/findAllBrands", CarController.findAllBrands);

//Find All Cars Specific Brand
router.post("/findByBrand", CarController.findByBrand);

//FInd Car By It's Name
router.get("/findByCar/:carId", CarController.findByCarId);

//Update Car Details
router.patch(
  "/updateCar/:id",
  CarController.updateCar
);

router.delete(
  "/deleteCar/:carId",
  CarController.deleteCar
);
module.exports = router;
