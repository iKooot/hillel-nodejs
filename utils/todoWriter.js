const path = require("path");
const fs = require("fs");

const todoWriter = (data) => {
  const dir = path.join(process.env.PWD, "/todos.json");
  const date = new Date();

  const baseTemplate = { todos: [] };

  if (data) {
    baseTemplate.todos.push(`[${date.toISOString()}]: ${data}`)
  }

  const writeStream = fs.createWriteStream(dir);

  writeStream.on("ready", (chunk) => {
    console.log(chunk)
  })

  writeStream.end(JSON.stringify(baseTemplate));
};

module.exports = {
  todoWriter,
};
