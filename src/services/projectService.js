const Project = require("../models/project");
const aqp = require("api-query-params");

module.exports = {
  postCreateProjectService: async (projectData) => {
    try {
      let result = null;
      if (projectData.type === "EMPTY-PROJECT") {
        result = await Project.create(projectData);
      }
      if (projectData.type === "ADD-USERS") {
        let project = await Project.findById(projectData.projectId);
        for (let i = 0; i < projectData.userArr.length; i++) {
          project.usersInfor.push(projectData.userArr[i]);
        }
        result = await project.save();
      }
      if (projectData.type === "ADD-TASKS") {
        let project = await Project.findById(projectData.projectId);
        for (let i = 0; i < projectData.taskIdArr.length; i++) {
          project.tasks.push(projectData.taskIdArr[i]);
        }
        result = await project.save();
      }
      if (projectData.type === "REMOVE-USERS") {
        let project = await Project.findById(projectData.projectId);
        for (let i = 0; i < projectData.userArr.length; i++) {
          project.usersInfor.pull(projectData.userArr[i]);
        }
        result = await project.save();
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getAllProjectService: async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    let OffSet = (page - 1) * limit;
    delete filter.page;
    result = await Project.find(filter)
      .populate(population)
      .skip(OffSet)
      .limit(limit)
      .exec();
    return result;
  },
  putUpdateProjectService: async (projectData) => {
    try {
      let result = await Project.updateOne(
        { _id: projectData.id },
        {
          ...projectData,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteProjectService: async (projectId) => {
    try {
      let result = await Project.deleteById(projectId);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
