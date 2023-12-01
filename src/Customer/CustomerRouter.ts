import express from "express";
import CustomerController from "./CustomerController.js";
import {
    validateCreateCustomer,
    validateCustomerQuery,
    validateUpdateCustomer
} from "../Utility/validation/customerValidation.js";
import {validateIdParamsString} from "../Utility/validation/validateIdParams.js";

export const customerRouter = express.Router();
const customerController = new CustomerController();

customerRouter.get("/customers", validateCustomerQuery, customerController.getAllCustomersExecutor);
customerRouter.get("/customers/:id/orders", customerController.getAllOrdersByCustomerIdExecutor)
customerRouter.get("/customers/:id", validateIdParamsString, customerController.getSingleCustomerExecutor);
customerRouter.put("/customers/:id", validateUpdateCustomer, customerController.updateCustomerExecutor);
customerRouter.delete("/customers/:id", validateIdParamsString, customerController.deleteCustomerExecutor);
customerRouter.post("/customers", validateCreateCustomer, customerController.createCustomerExecutor);
