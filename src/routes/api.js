const express = require("express");
const routerAPI = express.Router();
const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadFileAPI,
  postUploadFilesAPI,
} = require("../controllers/apiController");

const {
  getCustomerAPI,
  postCreateCustomer,
  postCreateCustomerManyAPI,
  putUpdateCustomerAPI,
  deleteCustomerAPI,
  deleteCustomersAPI,
} = require("../controllers/customerController");

const {
  postCreateProjectAPI,
  getAllProjectAPI,
  putUpdateProjectAPI,
  deleteProjectAPI,
} = require("../controllers/projectController");

const {
  postCreateTaskAPI,
  putUpdateTaskAPI,
  getAllTaskAPI,
  deleteTaskAPI,
} = require("../controllers/taskController");

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

routerAPI.post("/file", postUploadFileAPI);
routerAPI.post("/files", postUploadFilesAPI);

routerAPI.get("/customers", getCustomerAPI);

routerAPI.post("/customers", postCreateCustomer);
routerAPI.put("/customers", putUpdateCustomerAPI);
routerAPI.post("/customers-many", postCreateCustomerManyAPI);
routerAPI.delete("/customer", deleteCustomerAPI);
routerAPI.delete("/customers", deleteCustomersAPI);

routerAPI.get("/projects", getAllProjectAPI);
routerAPI.post("/projects", postCreateProjectAPI);
routerAPI.put("/projects", putUpdateProjectAPI);
routerAPI.delete("/projects", deleteProjectAPI);

routerAPI.post("/tasks", postCreateTaskAPI);
routerAPI.put("/tasks", putUpdateTaskAPI);
routerAPI.put("/tasks", putUpdateTaskAPI);
routerAPI.get("/tasks", getAllTaskAPI);
routerAPI.delete("/tasks", deleteTaskAPI);

module.exports = routerAPI;
