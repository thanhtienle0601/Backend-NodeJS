const Product = require("../models/product");
const connection = require("../config/database");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
} = require("../services/CRUDServices");
const User = require("../models/User");

const getHomepage = async (req, res) => {
  let results = await User.find();
  console.log(">>> results: ", results);
  res.render("home.ejs", { listUsers: results });
};

const getEJS = (req, res) => {
  res.render("sample.ejs");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  // let user = await getUserById(userId);
  let user = await User.findById(userId);
  res.render("edit.ejs", { user });
};

const postCreateUser = async (req, res) => {
  let { fullname, email, city } = req.body;
  console.log(
    ">>> fullname: ",
    req.body.fullname,
    " email: ",
    req.body.email,
    " city: ",
    req.body.city
  );

  await User.create({
    fullname,
    email,
    city,
  });

  res.send("Create new user succeed !");
};

const postUpdateUser = async (req, res) => {
  let { fullname, email, city, id } = req.body;
  // await updateUser(fullname, email, city, id);
  await User.updateOne({ _id: id }, { fullname, email, city });
  // res.send('Updated user succeed !');
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  // let user = await getUserById(userId);
  let user = await User.findById(userId);
  res.render("delete.ejs", { user });
};

const postRemoveUser = async (req, res) => {
  const id = req.body.id;
  // await deleteUserById(id);
  let result = await User.deleteOne({ _id: id });
  console.log(">>> result: ", result);
  res.redirect("/");
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
