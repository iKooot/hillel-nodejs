const yargs = require("yargs/yargs");
const { seek, seekEmitter } = require("./utils/FileSeeker");

const argv = yargs(process.argv).argv;

seekEmitter.emit("start", "Started project");

seek(argv.fileName, argv.fileDir);
