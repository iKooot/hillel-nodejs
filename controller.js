const fs = require("fs");
const path = require("path");
const { todoReader, todoWriter } = require('./utils/todoWriter');

const assets = (req, res) => {
  const { pathname } = new URL(req.originalUrl, "http://localhost");

  fs.createReadStream(path.join(__dirname, pathname)).pipe(res);
};

const index = async (req, res) => {
  let template = "";

  if (req.body) {
    await todoWriter(req.body.todo)
  }

  const list = await todoReader()

  const indexFile$ = fs.createReadStream("./index.html", { encoding: "utf-8" });


  indexFile$.on("data", (chunk) => {
    template += chunk;
  });

  indexFile$.on("end", () => {
    const items = list.map(item => `<li>${item}</li>`).join('\n');
    template = template.replace('{%todoItem%}', items);

    res.end(template);
  });

  indexFile$.on("error", (error) => {
    console.error(error);

    res.statusCode = 500;
    res.end();
  });
};

module.exports = {
  assets,
  index,
};
