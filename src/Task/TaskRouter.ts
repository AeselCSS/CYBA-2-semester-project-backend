import express from "express";
import TaskController from "./TaskController.js";

export const taskRouter = express.Router();
const taskController = new TaskController();

taskRouter.patch("/tasks/:id", taskController.initiateTaskExecutor)