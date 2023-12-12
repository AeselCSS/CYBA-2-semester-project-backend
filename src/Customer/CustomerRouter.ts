import express from "express";
import CustomerController from "./CustomerController.js";
import {
    validateCreateCustomer, validateCustomerOrdersQuery,
    validateCustomerQuery,
    validateUpdateCustomer
} from "../Utility/validation/customerValidation.js";
import {validateIdParamsString} from "../Utility/validation/validateIdParams.js";

export const customerRouter = express.Router();
const customerController = new CustomerController();


customerRouter.route("/customers")
    .get(validateCustomerQuery, customerController.getAllCustomersExecutor)
    .post(validateCreateCustomer, customerController.createCustomerExecutor);

customerRouter.route("/customers/:id")
    .get(validateIdParamsString, customerController.getSingleCustomerExecutor)
    .put(validateUpdateCustomer, customerController.updateCustomerExecutor)
    .delete(validateIdParamsString, customerController.deleteCustomerExecutor);

customerRouter.route("/customers/:id/orders")
    .get(validateCustomerOrdersQuery,customerController.getAllOrdersByCustomerIdExecutor);

customerRouter.route("/customers/:id/cars")
    .get(validateIdParamsString, customerController.getAllCarsByCustomerIdExecutor);