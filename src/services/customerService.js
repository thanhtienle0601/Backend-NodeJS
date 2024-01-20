const Customer = require("../models/Customer");
const aqp = require("api-query-params");

const getCustomerAPI = async (page, limit, queryString) => {
  try {
    let result = null;
    if (page && limit) {
      let OffSet = (page - 1) * limit;
      const { filter } = aqp(queryString);
      delete filter.page;
      console.log(">>> filter: ", filter);
      result = await Customer.find(filter).skip(OffSet).limit(limit).exec();
    } else {
      result = await Customer.find({});
    }
    return result;
  } catch (error) {
    console.log(">>> error: ", error);
    return null;
  }
};

const putUpdateCustomerService = async (customerData) => {
  try {
    let result = await Customer.updateOne(
      { _id: customerData.id },
      {
        name: customerData.name,
        address: customerData.address,
        email: customerData.email,
        phone: customerData.phone,
      }
    );
    return result;
  } catch (error) {
    console.log(">>> error:", error);
    return null;
  }
};

const createCustomerService = async (customerData) => {
  try {
    let result = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      description: customerData.description,
      image: customerData.image,
    });
    return result;
  } catch (error) {
    console.log(">>> error: ", error);
    return null;
  }
};

const createCustomerManyService = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.log(">>> error: ", error);
    return null;
  }
};

const deleteCustomerService = async (id) => {
  try {
    let result = await Customer.deleteById(id);
    return result;
  } catch (error) {
    console.log(">>> error: ", error);
    return null;
  }
};

const deleteCustomersService = async (arr) => {
  try {
    let result = await Customer.delete({ _id: { $in: arr } });
    return result;
  } catch (error) {
    console.log(">>> error: ", error);
    return null;
  }
};

module.exports = {
  createCustomerService,
  createCustomerManyService,
  getCustomerAPI,
  putUpdateCustomerService,
  deleteCustomerService,
  deleteCustomersService,
};
