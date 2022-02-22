const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
const { info, warn, error } = require("./logger");

const MyEventEmitter = new EventEmitter();

MyEventEmitter.once("start", (payload) => {
  info(`----- ${payload} -----`);
});

MyEventEmitter.on("status", (payload) => {
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

const seek = (target, dirPAth = "/") => {
  const dir = path.join(process.env.PWD, dirPAth);
  let status = "searching";

  MyEventEmitter.emit("status", {
    status: "searching",
    message: `started searching in directory:\n${dir}`,
  });

  const interval = setInterval(() => {
    if (status === "searching") {
      MyEventEmitter.emit("status", { status: "searching" });
    }

    if (status === "success") {
      MyEventEmitter.emit("status", {
        status: "success",
        message: `file ${target} is in the directory`,
        path: dir,
      });
      clearInterval(interval);
    }

    if (status === "failed") {
      MyEventEmitter.emit("status", {
        status: "failed",
        message: `file ${target} not found`,
      });
      clearInterval(interval);
    }
  }, 1);

  fs.readdir(dir, (error, data) => {
    if (error) throw error;

    if (data.length) {
      data.includes(target) ? (status = "success") : (status = "failed");
    } else {
      MyEventEmitter.emit("status", {
        status: "failed",
        message: "folder is empty",
      });
    }
  });
};

module.exports = {
  seek,
  seekEmitter: MyEventEmitter,
};
