const express = require("express");
const app = express();

const dotenv = require("dotenv").config();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).send("Home page...");
});

app.listen(port, () => console.log(`listening at port ${port}...`));
