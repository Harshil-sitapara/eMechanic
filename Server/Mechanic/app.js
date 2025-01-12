const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const accountRoutes = require("./services/accountServices");
const orderRoutes = require("./services/orderServices");
require("dotenv").config();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

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
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

//Every request from admin route goes through this url : /admin
app.use("/mechanic/account", accountRoutes);
app.use("/mechanic/orders", orderRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Mechanic Server: Up and running. All services are operational.",
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
