const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const port = process.env.PORT || 8040;
server.listen(port, () => {
  console.log("Server is Listening on Customer MS Port: " + port);
});
