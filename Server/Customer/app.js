const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const dbConfig = require("./config/dbConfig");
const authRoutes = require("./services/authServices");
const accountRoutes = require("./services/accountServices");
const orderRoutes = require("./services/orderServices");
require('dotenv').config();

/*
Via Express routes, HTTP request that matches a route will be checked by 
CORS Middleware before coming to Security layer
*/
var corsOptions = {
  origin: ["http://localhost:3000", "https://e-mechanic.vercel.app"],
};
app.use(cors(corsOptions));

//Database Connection
module.exports = {
  secretKey: "customer_server_key",
};



mongoose
  .connect(
    // `mongodb://localhost:27017/emechanic`,
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  ).then(()=>{
      console.log("Connected to MongoDb Database");
  })
  .catch((err) => {
    console.log("Database Connection Error: " + err);
  });
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
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

//Every request from customer route goes through this url : /customer
app.use("/customer/auth", authRoutes);
app.use("/customer/account", accountRoutes);
app.use("/customer/order", orderRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Customer Server: Up and running. All services are operational." });
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
