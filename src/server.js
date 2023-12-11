//config .env
require('dotenv').config();
const express = require('express');
const app = express();
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const connection = require('./config/database');

const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

console.log('>>> check env:', process.env.PORT);

//config template engine
//config static files
configViewEngine(app);

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//khai bao routes
app.use('/', webRoutes);

// simple query
// connection.query('SELECT * FROM `Users` ', function (err, results, fields) {
//   console.log('>>> results: ', results); // results contains rows returned by server
// });

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
