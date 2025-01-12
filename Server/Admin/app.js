const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const dbConfig = require("./config/dbConfig");
const authRoutes = require("./services/authServices");
const carRoutes = require("./services/carServices");
const serviceRoutes = require("./services/car-washServices");
const orderRoutes = require("./services/orderServices");
const mechanicRoutes = require("./services/mechanicServices");
require("dotenv").config();

var corsOptions = {
  origin: ["http://localhost:3000", "https://e-mechanic.vercel.app"],
};

app.use(cors(corsOptions));

module.exports = {
  secretKey: "admin_server_key",
};

mongoose
  .connect(
    // `mongodb://localhost:27017/emechanic`,
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .catch((err) => {
    console.log("Database Connection Error: " + err);
  });
let db = mongoose.connection;

//To check Database Connection
db.once("open", function () {
  console.log("Connected to MongoDb Database");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//For preventing CORS ERRORS  (Postman is just a testing tool)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Every request from admin route goes through this url : /admin
app.use("/admin/auth", authRoutes);
app.use("/admin/car-func", carRoutes);
app.use("/admin/car-services", serviceRoutes);
app.use("/admin/order", orderRoutes);
app.use("/admin/mechanic", mechanicRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Admin Server: Up and running. All services are operational.",
  });
});

//Server Side Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
