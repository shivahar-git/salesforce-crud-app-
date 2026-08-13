const express = require("express");
const axios = require("axios");

const objectConfig = require("../utils/objectConfig");

const router = express.Router();

let authModule;

router.use((req, res, next) => {
  authModule = require("./auth");
  next();
});
