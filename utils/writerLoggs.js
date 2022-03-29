const fs = require("fs");
const path = require("path");

const logger = (event, content) => {
  const dir = path.join(process.env.PWD, "/events.log");
  const date = new Date();

  const writeStream = fs.createWriteStream(dir, {flags: 'a+'});

  writeStream.end(
    `Date: ${date.toUTCString()}\nEvent: ${event}\n${
      content ? "Content: " + JSON.stringify(content) : ""
    }\n`
  );

};

module.exports = {
  logger,
};
