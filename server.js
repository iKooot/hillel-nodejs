const http = require("http");
const fs = require("fs");
const { logger } = require("./utils/writerLoggs");

const HOST_NAME = "localhost";
const PORT = 3003;

const server = http.createServer();

server.addListener("request", (req, res) => {
  if (req.url === "/") {
    fs.createReadStream("./index.html").pipe(res);
    logger(req.url);
  } else if (req.url === "/favicon.ico") {
    fs.createReadStream("./assets/icon.jpg").pipe(res);
    logger(req.url);
  } else {
    res.destroy();
  }
});

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server is servering on http://${HOST_NAME}:${PORT}`);
});
