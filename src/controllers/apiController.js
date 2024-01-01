const User = require("../models/User");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  let { fullname, email, city } = req.body;
  console.log(
    ">>> fullname: ",
    req.body.fullname,
    " email: ",
    req.body.email,
    " city: ",
    req.body.city
  );

  let user = await User.create({
    fullname,
    email,
    city,
  });

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let { fullname, email, city, id } = req.body;

  let user = await User.updateOne({ _id: id }, { fullname, email, city });

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  const id = req.body.id;
  // await deleteUserById(id);
  let result = await User.deleteOne({ _id: id });
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
};
