const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Start server at port 3001.");
});

const fruits = require("./db");

// get
app.get("/fruits", (req, res) => {
  res.json(fruits);
  fs.readFile(path.join(__dirname, "data.json"), (err, data) => {
    if (err) throw err;
    const item = JSON.parse(data).find((i) => i.id === req.params.id);
    const imagePath = item.image;
    res.sendFile(path.join(__dirname, imagePath));
  });
});

// get id
app.get("/fruits/:id", (req, res) => {
  res.json(fruits.find((book) => book.id === req.params.id));
});

// post or insert new item
app.post("/fruits", (req, res) => {
  fruits.push(req.body);
  res.status(201).json(req.body);
});

// update or change item with route id
app.put("/fruits/:id", (req, res) => {
  const updateIndex = fruits.findIndex((book) => book.id === req.params.id);
  res.json(Object.assign(fruits[updateIndex], req.body));
});

// delete item with route id
app.delete("/fruits/:id", (req, res) => {
  const deletedIndex = fruits.findIndex((book) => book.id === req.params.id);
  fruits.splice(deletedIndex, 1);
  res.status(204).send();
});
