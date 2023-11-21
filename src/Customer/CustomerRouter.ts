import express from "express";
import CustomerController from "./CustomerController.js";

export const customerRouter = express.Router();
const customerController = new CustomerController();

customerRouter.get("/customers", customerController.getAllCustomersExecutor);
customerRouter.get("/customers/:id", customerController.getSingleCustomerExecutor);
customerRouter.put("/customers/:id", customerController.updateSingleCustomerExecutor);
customerRouter.delete("/customers/:id", customerController.deleteSingleCustomerExecutor);
