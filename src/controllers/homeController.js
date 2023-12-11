const Product = require('../models/product');
const connection = require('../config/database');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
} = require('../services/CRUDServices');

const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  console.log('>>> results: ', results);
  res.render('home.ejs', { listUsers: results });
};

const getEJS = (req, res) => {
  res.render('sample.ejs');
};

const getCreatePage = (req, res) => {
  res.render('create.ejs');
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render('edit.ejs', { user });
};

const postCreateUser = async (req, res) => {
  let { fullname, email, city } = req.body;
  console.log(
    '>>> fullname: ',
    req.body.fullname,
    ' email: ',
    req.body.email,
    ' city: ',
    req.body.city
  );
  // connection.query(
  //   'INSERT INTO Users  (email, name, city)  VALUES (?,?,?)',
  //   [email, fullname, city],
  //   function (err, results) {
  //     console.log(results);
  //     res.send('Create new user succeed !');
  //   }
  // );
  let [rows, fields] = await connection.query(
    'INSERT INTO Users  (email, name, city)  VALUES (?,?,?)',
    [email, fullname, city]
  );

  console.log('>>> rows: ', rows);

  res.send('Create new user succeed !');
};

const postUpdateUser = async (req, res) => {
  let { fullname, email, city, id } = req.body;
  await updateUser(fullname, email, city, id);
  // res.send('Updated user succeed !');
  res.redirect('/');
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render('delete.ejs', { user });
};

const postRemoveUser = async (req, res) => {
  const id = req.body.id;
  await deleteUserById(id);
  res.redirect('/');
};

module.exports = {
  getHomepage,
  getEJS,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postRemoveUser,
};
