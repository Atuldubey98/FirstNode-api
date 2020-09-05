const http = require("http");
const app = require("./app")
//Handle incoming
const port = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port)