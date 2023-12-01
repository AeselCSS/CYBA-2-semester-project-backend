import express from "express";
import EmployeeController from "./EmployeeController.js";
import {validateCreateEmployeeBody, validateEmployeeQuery} from "../Utility/validation/employeeValidation.js";
import {validateIdParamsString} from "../Utility/validation/validateIdParams.js";

export const employeeRouter = express.Router()
const employeeController = new EmployeeController();

employeeRouter.get("/employees", validateEmployeeQuery, employeeController.getAllEmployeesExecutor)

employeeRouter.get("/employees/:id", validateIdParamsString, employeeController.getSingleEmployeeExecutor)

employeeRouter.post("/employees", validateCreateEmployeeBody, employeeController.createEmployeeExecutor)