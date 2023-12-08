import express from "express";
import TaskController from "./TaskController.js";
import {validateCreateComment, validateInitiateTask} from "../Utility/validation/taskValidation.js";
import {validateIdParamsInt} from "../Utility/validation/validateIdParams.js";

export const taskRouter = express.Router();
const taskController = new TaskController();

taskRouter.patch("/tasks/:id", validateInitiateTask, taskController.initiateTaskExecutor);
taskRouter.post("/tasks/:id/comments", validateCreateComment, taskController.createCommentExecutor)
taskRouter.get("/tasks", taskController.getTasksExecutor)
taskRouter.get("/tasks/:id", validateIdParamsInt, taskController.getSingleTaskExecutor)