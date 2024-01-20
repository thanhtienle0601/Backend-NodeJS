const { uploadSingleFile } = require("../services/UploadFileServices");
const {
  createCustomerService,
  createCustomerManyService,
  getCustomerAPI,
  putUpdateCustomerService,
  deleteCustomerService,
  deleteCustomersService,
} = require("../services/customerService");
const Joi = require("joi");

module.exports = {
  getCustomerAPI: async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;
    let name = req.query.name;

    let result = null;
    if (page && limit && name) {
      result = await getCustomerAPI(page, limit, req.query);
    } else {
      result = await getCustomerAPI();
    }
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;
    console.log(">>> name, des: ", name, description);
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      address: Joi.string().required(),
      phone: Joi.string().pattern(new RegExp("^[Z0-9]{10,12}$")).required(),
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(200).json({
        msg: error,
      });
    } else {
      let imageUrl = "";
      if (!req.files || Object.keys(req.files).length === 0) {
        // do nothing
      } else {
        let result = await uploadSingleFile(req.files.image);
        imageUrl = result.path;
        console.log(">>> imageUrl: ", imageUrl);
      }

      let customerData = {
        name,
        address,
        phone,
        email,
        description,
        image: imageUrl,
      };

      let customer = await createCustomerService(customerData);

      return res.status(200).json({
        EC: 0,
        data: customer,
      });
    }
  },
  postCreateCustomerManyAPI: async (req, res) => {
    console.log(">>> customers: ", req.body.customers);
    let customers = await createCustomerManyService(req.body.customers);
    if (customers) {
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(400).json({
        EC: -1,
        data: customers,
      });
    }
  },
  putUpdateCustomerAPI: async (req, res) => {
    console.log(">>> id: ", req.body.id);
    const { id, name, address, email, phone } = req.body;
    let customerData = {
      id,
      name,
      address,
      email,
      phone,
    };
    let customer = await putUpdateCustomerService(customerData);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  deleteCustomerAPI: async (req, res) => {
    console.log(">>> id: ", req.body.id);
    let id = req.body.id;
    let customer = await deleteCustomerService(id);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  deleteCustomersAPI: async (req, res) => {
    let customerId = req.body.customerId;
    console.log(">>> customerId: ", customerId);
    let customer = await deleteCustomersService(customerId);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
};
