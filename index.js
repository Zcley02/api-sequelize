const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const { boomErrorHandler,  errorHandler, ormErrorHandler } = require("./middlewares/error.handler");
require('dotenv').config();
require('./utils/auth');

const appRouter = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

appRouter(app);

app.use(boomErrorHandler);
app.use(errorHandler);
app.use(ormErrorHandler);

app.listen(PORT, () => {
  console.log("Server is running");
});
