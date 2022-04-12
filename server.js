const express = require("express");
const routes = require("./routes");
const bodyParser = require('body-parser')
const livereload = require('livereload')
const connectLiveReload = require("connect-livereload");

const HOST_NAME = process.env.HOST_NAME ?? "localhost";
const PORT = process.env.PORT ?? 3004;

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express();

app.use(connectLiveReload());

app.use(bodyParser());

app.use("/", routes.home);
app.use("/catalog", routes.catalog);
app.use("/assets", routes.assets)


app.listen(PORT, HOST_NAME, () => {
  console.log(`Server is servering on http://${HOST_NAME}:${PORT}`);
});
