const Task = require("../models/task");
const aqp = require("api-query-params");

module.exports = {
  postCreateTaskService: async (taskData) => {
    let result = null;
    if (taskData.type === "EMPTY-TASK") {
      result = await Task.create(taskData);
    }
    return result;
  },
  putUpdateTaskService: async (taskData) => {
    try {
      let result = await Task.updateOne({ _id: taskData.id }, { ...taskData });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getAllTaskService: async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    let OffSet = (page - 1) * limit;
    delete filter.page;
    let result = await Task.find({ filter })
      .populate(population)
      .skip(OffSet)
      .limit(limit)
      .exec();
    return result;
  },
  deleteTaskService: async (taskId) => {
    try {
      let result = await Task.deleteById(taskId);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
