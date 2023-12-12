import express from "express";
import TaskController from "./TaskController.js";
import {validateCreateComment, validateInitiateTask} from "../Utility/validation/taskValidation.js";
import {validateIdParamsInt} from "../Utility/validation/validateIdParams.js";

export const taskRouter = express.Router();
const taskController = new TaskController();

taskRouter.route("/tasks/:id")
    .get(validateIdParamsInt, taskController.getSingleTaskExecutor)
    .patch(validateInitiateTask, taskController.initiateTaskExecutor);

taskRouter.route("/tasks")
    .get(taskController.getTasksExecutor);

taskRouter.route("/tasks/:id/comments")
    .post(validateCreateComment, taskController.createCommentExecutor);
