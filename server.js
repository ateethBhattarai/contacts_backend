const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();

const dotenv = require("dotenv").config();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/contacts/", require("./routes/contact_routes"));
app.use(errorHandler);

app.listen(port, () => console.log(`listening at port ${port}...`));
