import {param, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

export const validateUpdateSubtaskStatus = [
    param("id").isInt().withMessage("Subtask id must be an integer"),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(400).json({message: errors.array()[0].msg});
            return;
        }
        next();
    }
]