const express = require("express");
const app = express();

const dotenv = require("dotenv").config();

const port = process.env.PORT || 8000;

app.use("/api/contacts/", require("./routes/contact_routes"));

app.listen(port, () => console.log(`listening at port ${port}...`));
