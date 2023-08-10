const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db_connection");
const app = express();

const dotenv = require("dotenv").config();

connectDB(); //db connection

const port = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/contacts/", require("./routes/contact_routes"));
app.use("/api/users/", require("./routes/user_routes"));
app.use(errorHandler);

app.listen(port, () => console.log(`listening at port ${port}...`));
