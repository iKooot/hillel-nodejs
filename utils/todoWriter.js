const path = require("path");
const fs = require("fs");

const todoReader = async () => {
  const dir = path.join(process.env.PWD, "/todos.json");

  const file$ = fs.createReadStream(dir, { encoding: "utf-8" })

  const data = await new Promise( (res, rej) => {
    let result = ''

    file$.on("data", chunk => {
      result += chunk
    })

    file$.on('end', () => {
      res(result);
    });

    file$.on('error', rej);
  })

  return JSON.parse(data)
}

const todoWriter = async (data) => {
  const dir = path.join(process.env.PWD, "/todos.json");
  const date = new Date();
  let template = null;

  try {
    fs.accessSync(dir)
    template = await todoReader()

    if (data) {
      template.push(`[${date.toISOString()}]: ${data}`)
    }

  } catch {
    template = []
  }

  const writeStream = fs.createWriteStream(dir);

  writeStream.end(JSON.stringify(template));
};

module.exports = {
  todoWriter,
  todoReader
};
