import express from "express";
import EmployeeController from "./EmployeeController.js";
import {validateCreateEmployeeBody, validateEmployeeQuery} from "../Utility/validation/employeeValidation.js";
import {validateIdParamsString} from "../Utility/validation/validateIdParams.js";

export const employeeRouter = express.Router()
const employeeController = new EmployeeController();


employeeRouter.route("/employees")
    .get(validateEmployeeQuery, employeeController.getAllEmployeesExecutor)
    .post(validateCreateEmployeeBody, employeeController.createEmployeeExecutor);

employeeRouter.route("/employees/:id")
    .get(validateIdParamsString, employeeController.getSingleEmployeeExecutor);