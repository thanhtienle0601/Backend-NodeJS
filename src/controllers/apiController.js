const User = require("../models/User");

const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../services/UploadFileServices");

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

const postUploadFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let result = await uploadSingleFile(req.files.image);

  return res.status(200).json({
    EC: 0,
    date: result,
  });
};

const postUploadFilesAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  if (Array.isArray(req.files.image)) {
    let result = await uploadMultipleFiles(req.files.image);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } else {
    return postUploadFileAPI(req, res);
  }
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadFileAPI,
  postUploadFilesAPI,
};
