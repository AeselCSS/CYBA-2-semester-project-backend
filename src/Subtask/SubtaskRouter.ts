import express from "express";
import SubtaskController from "./SubtaskController.js";
import {validateUpdateSubtaskStatus} from "../Utility/validation/subtaskValidation.js";


export const subtaskRouter = express.Router();
const subtaskController = new SubtaskController();


subtaskRouter.route("/subtasks/:id")
    .patch(validateUpdateSubtaskStatus,subtaskController.updateSubtaskStatusExecutor);