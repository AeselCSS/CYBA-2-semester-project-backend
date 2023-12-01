import express from "express";
import SubtaskController from "./SubtaskController.js";
import {validateUpdateSubtaskStatus} from "../Utility/validation/subtaskValidation.js";


export const subtaskRouter = express.Router();
const subtaskController = new SubtaskController();

//subtaskId som param, taskInstanceId i req.body
subtaskRouter.patch("/subtasks/:id", validateUpdateSubtaskStatus,subtaskController.updateSubtaskStatusExecutor)