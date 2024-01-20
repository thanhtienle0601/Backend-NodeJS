const {
  postCreateTaskService,
  putUpdateTaskService,
  getAllTaskService,
  deleteTaskService,
} = require("../services/taskService");

module.exports = {
  postCreateTaskAPI: async (req, res) => {
    let task = await postCreateTaskService(req.body);
    return res.status(200).json({
      EC: 0,
      data: task,
    });
  },
  putUpdateTaskAPI: async (req, res) => {
    let task = await putUpdateTaskService(req.body);
    return res.status(200).json({
      EC: 0,
      data: task,
    });
  },
  getAllTaskAPI: async (req, res) => {
    let task = await getAllTaskService(req.query);
    return res.status(200).json({
      EC: 0,
      data: task,
    });
  },
  deleteTaskAPI: async (req, res) => {
    let task = await deleteTaskService(req.body.id);
    return res.status(200).json({
      EC: 0,
      data: task,
    });
  },
};
