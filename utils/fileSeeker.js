const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const seek = (target, dirPath = "/") => {
  const _emitter = new EventEmitter();
  const dir = path.join(process.env.PWD, dirPath);

  fsPromises
    .access(dir)
    .then(() => {
      return fsPromises.readdir(dir);
    })
    .then((files) => {
      if (files.includes(target)) {
        _emitter.emit("success", {
          message: `file ${target} is in the directory`,
          path: dir,
        });

        return fsPromises.readFile(target, "utf-8");
      } else {
        _emitter.emit(
          "error",
          `file ${target} doesn't exist in directory ${dir}`
        );

        process.exit(1);
      }
    })
    .then((content) => {
      _emitter.emit("data", content);
    })
    .catch((error) => {
      _emitter.emit("error", error);
    });

  return _emitter;
};

module.exports = {
  seek,
};
