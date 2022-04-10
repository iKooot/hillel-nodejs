const fs = require("fs");
const path = require("path");
const queryString = require('query-string');
const { todoWriter } = require('./utils/todoWriter');

const assets = (req, res) => {
  const { pathname } = new URL(req.originalUrl, "http://localhost");

  fs.createReadStream(path.join(__dirname, pathname)).pipe(res);
};

const index = (req, res) => {
  let parseSearchParams = {};
  let template = "";
  let list = null;

  if (req.body) {
    parseSearchParams = {...req.body}
    todoWriter(parseSearchParams.todo)
  } else {
    const { search } = new URL(req.url, "http://localhost");
    parseSearchParams = queryString.parse(search)
  }

  const indexFile$ = fs.createReadStream("./index.html", { encoding: "utf-8" });
  const todoFile$ = fs.createReadStream("./todos.json", { encoding: "utf-8" })


  indexFile$.on("data", (chunk) => {
    template += chunk;
  });

  todoFile$.on("data", (chunk) => {
    list = JSON.parse(chunk)
  })

  indexFile$.on("end", () => {

    template = template.replace(new RegExp('{%todoItem%}', 'gi'), list.todos[0])

    // template = Object.keys(parseSearchParams).reduce(
    //   (result, key) => result.replace(new RegExp(`\{\%${key}\%\}`, 'gi'), parseSearchParams[key]),
    //   template
    // );
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
