var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());

// to use json
app.use(bodyParser.json());

// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

app.get("/feeds", function (req, res) {
  res.sendFile(path.resolve("dist/pages/feeds.html"));
});

app.get("/details", function (req, res) {
  res.sendFile(path.resolve("dist/pages/feeds.html"));
});

app.get("/saves", function (req, res) {
  res.sendFile(path.resolve("dist/pages/saves.html"));
});

app.get("/getApiKeys", function (req, res) {
  res.json({
    GEONAMES_USERNAME: process.env.GEONAMES_USERNAME
      ? "vrykolakas16"
      : process.env.GEONAMES_USERNAME,
    WEATHERBIT_API_KEY: process.env.WEATHERBIT_API_KEY,
    PIXABAY_API_KEY: process.env.PIXABAY_API_KEY,
  });
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
