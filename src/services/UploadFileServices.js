const path = require("path");

const uploadSingleFile = async (fileObject) => {
  let uploadPath = path.resolve(__dirname, "../public/images/upload");

  let extName = path.extname(fileObject.name);

  let baseName = path.basename(fileObject.name, extName);

  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (error) {
    console.log(">>> check error: ", error);
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};

const uploadMultipleFiles = async (fileArray) => {
  console.log(">>> check fileArray : ", fileArray);
  try {
    let uploadPath = path.resolve(__dirname, "../public/images/upload");
    let resultArr = [];
    let countSuccess = 0;
    for (let i = 0; i < fileArray.length; i++) {
      let extName = path.extname(fileArray[i].name);

      let baseName = path.basename(fileArray[i].name, extName);

      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;

      try {
        await fileArray[i].mv(finalPath);
        resultArr.push({
          status: "success",
          path: finalName,
          fileName: fileArray[i].name,
          error: null,
        });
        countSuccess++;
      } catch (error) {
        resultArr.push({
          status: "failed",
          path: finalName,
          fileName: fileArray[i].name,
          error: JSON.stringify(error),
        });
      }
    }
    return {
      countSuccess,
      details: resultArr,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};
