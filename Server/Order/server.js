const http = require("http");
const app = require("./app");
const Razorpay = require('razorpay');
const server = http.createServer(app);

// set port, listen for requests
// const port =  8030;
const port = process.env.PORT || 8030;

server.listen(port, () => {
  console.log("Server is Listening on Order MS Port: " + port);
});

const instance = new Razorpay({
  key_id: process.env.KEY,
  key_secret: process.env.SECRET,
});
