import {param, body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

export const validateInitiateTask = [
    param("id").isInt({min: 1}).withMessage("Task instance id must be a positive integer"),
    body("employeeId").isString().withMessage("Employee id must be a string"),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(400).json({errors: errors.array()});
            return;
        }
        next();
    }
];

export const validateCreateComment = [
    param("id").isInt({min: 1}).withMessage("Task instance id must be a positive integer"),
    body("comment").isString().withMessage("Comment must be a string"),
    body("employeeId").isString().withMessage("Employee id must be a string"),
    (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(400).json({errors: errors.array()});
            return;
        }
        next();
    }
];
