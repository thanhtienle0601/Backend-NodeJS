const {
  postCreateProjectService,
  getAllProjectService,
  putUpdateProjectService,
  deleteProjectService,
} = require("../services/projectService");

module.exports = {
  postCreateProjectAPI: async (req, res) => {
    // const { name, startDate, endDate, description, customerInfor, leader } =
    //   req.body;
    // console.log(name, startDate, endDate, description, customerInfor, leader);
    // let projectData = {
    //   name,
    //   startDate,
    //   endDate,
    //   description,
    //   customerInfor,
    //   leader,
    // };
    console.log(req.body);
    let project = await postCreateProjectService(req.body);
    return res.status(200).json({
      EC: 0,
      data: project,
    });
  },
  getAllProjectAPI: async (req, res) => {
    let project = await getAllProjectService(req.query);
    return res.status(200).json({
      EC: 0,
      data: project,
    });
  },
  putUpdateProjectAPI: async (req, res) => {
    let project = await putUpdateProjectService(req.body);
    return res.status(200).json({
      EC: 0,
      data: project,
    });
  },
  deleteProjectAPI: async (req, res) => {
    let project = await deleteProjectService(req.body.id);
    return res.status(200).json({
      EC: 0,
      data: project,
    });
  },
};
