//config .env
require("dotenv").config();
const express = require("express");
const app = express();
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const fileUpload = require("express-fileupload");
const connection = require("./config/database");
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config upload file
// default options
app.use(fileUpload());

//config template engine
//config static files
configViewEngine(app);

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//khai bao routes
app.use("/", webRoutes);
app.use("/v1/api", apiRoutes);

(async () => {
  try {
    //using mongoose
    await connection();

    //using mongodb driver
    //connection URL
    // const url = process.env.DB_HOST_WITH_DRIVER;
    // const client = new MongoClient(url);
    // Database Name
    // const dbName = process.env.DB_NAME;
    // Use connect method to connect to the server
    // await client.connect();
    // console.log("Connected successfully to server");
    // const db = client.db(dbName);
    // const collection = db.collection("documents");

    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
