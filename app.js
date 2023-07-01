//setup express
const express = require("express");
const app = express();

//import other dependencies
const bodyp = require("body-parser");
const cors = require("cors");
var path = require("path");
const securityMiddleMan = require('./utils/security');
const db = require("./utils/db.util");
const loggingMiddleware = require("./utils/logging");
const appRoutes = require('./routes/routes');

db.connect();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json();
  }
  next();
});


app.use(bodyp.json());
app.use(bodyp.urlencoded({ extended: true }));

app.use(
  cors({
    exposedHeaders: ["x-access-token", "x-refresh-token"],
  })
);
app.use(securityMiddleMan.limiter);
app.use(securityMiddleMan.blockIP);
app.use(loggingMiddleware)
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
app.use("/logs", express.static("logs"));

//testing the api
app.get("/", (req, res) => {
  res.send("WELCOME TO THE BUSINESS COMPANION A.P.I.");
});

//setting up routes
app.use('/api/', appRoutes);

module.exports = app;
