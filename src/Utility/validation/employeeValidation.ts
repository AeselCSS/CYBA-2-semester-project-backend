import {query, body, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const validateEmployeeQuery = [
    query('sortBy').isString().isIn(['firstName', 'lastName', 'role', 'department']).withMessage('sortBy must be a string'),
    query('sortDir').isString().isIn(['asc', 'desc']).withMessage('sortDir must be a string'),
    query('pageSize').isInt({ min: 1 }).withMessage('pageSize must be a positive integer'),
    query('pageNum').isInt({ min: 1 }).withMessage('pageNum must be a positive integer'),
    query('searchValue').optional().isString().withMessage('Search value must be a string.'),
    query('filterBy').optional().isString().isIn(['sales', 'management', 'development']).withMessage('filterBy must be a string.'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateCreateEmployeeBody = [
    body('id').isString().withMessage('id must be a string'),
    body('firstName').isString().withMessage('firstName must be a string'),
    body('lastName').isString().withMessage('lastName must be a string'),
    body('role').isString().isIn(['sales', 'management', 'development']).withMessage('role must be a string.'),
    body('department').isString().isIn(['sales', 'management', 'development']).withMessage('department must be a string.'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    },
];