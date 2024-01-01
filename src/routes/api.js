const express = require("express");
const routerAPI = express.Router();
const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
} = require("../controllers/apiController");

routerAPI.get("/", (req, res) => {
  res.send("Hello world with API");
});

routerAPI.get("/abc", (req, res) => {
  res.status(200).json({
    data: "Hello abc",
  });
});

routerAPI.get("/users", getUsersAPI);

routerAPI.post("/users", postCreateUserAPI);

routerAPI.put("/users", putUpdateUserAPI);

routerAPI.delete("/users", deleteUserAPI);

module.exports = routerAPI;
