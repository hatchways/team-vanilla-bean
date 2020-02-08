const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const mongoose = require("mongoose");
const uri = "mongodb://localhost/kanban";

const { json, urlencoded } = express;

const app = express();
const port = 3000;

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

//database set-up
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

//listen to server
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

module.exports = app;
