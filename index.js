const yargs = require("yargs/yargs");
const { seek, seekEmitter } = require("./utils/FileSeeker");
const { info, error, warn } = require("./utils/logger");

const argv = yargs(process.argv).argv;

seekEmitter.once("start", (payload) => {
  info(`----- ${payload} -----`);
});

seekEmitter.on("status", (payload) => {
  const { status, message, path } = payload;

  const alertMessage = `${message}\n-------\nPath: ${path}`;

  if (status === "success") {
    info(alertMessage);
  }
  if (status === "failed") {
    error(message);
  }
  if (status === "searching") {
    warn(message ?? "searching...");
  }
});

seekEmitter.emit("start", "Started project");

seek(argv.fileName, argv.fileDir);
