import {param, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const validateIdParamsInt = [
    param('id').isInt({min: 1}).withMessage('id must be a positive integer'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        next();
    },
];

export const validateIdParamsString = [
    param('id').isString().withMessage('id must be a string'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        next();
    },
];