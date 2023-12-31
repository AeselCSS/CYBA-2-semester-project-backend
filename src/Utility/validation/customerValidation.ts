import {query, body, validationResult, param} from 'express-validator';
import {Request, Response, NextFunction} from 'express';

export const validateCustomerQuery = [
    query('sortBy').isString().isIn(['id', 'firstName', 'lastName', 'address', 'email', 'city', 'phone', 'zip', 'email', 'createdAt', 'updatedAt']).withMessage("sortBy must be of type: 'id', 'firstName', 'phone', 'lastName', 'address', 'email', 'city', 'zip', 'email', 'createdAt', 'updatedAt'"),
    query('sortDir').isString().isIn(['asc', 'desc']).withMessage("sortDir must be either 'asc' or 'desc' "),
    query('pageSize').isInt({min: 1}).withMessage('pageSize must be a positive integer'),
    query('pageNum').isInt({min: 1}).withMessage('pageNum must be a positive integer'),
    query('searchValue').optional().isString().withMessage('Search value must be a string.'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        next();
    },
];

export const validateCustomerOrdersQuery = [
    query('pageSize').isInt({min: 1}).withMessage('pageSize must be a positive integer'),
    query('pageNum').isInt({min: 1}).withMessage('pageNum must be a positive integer'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        next();
    },
]

export const validateCustomerCarsQuery = [

]

export const validateCreateCustomer = [
    body('id').isString().withMessage('id must be a string'),
    body('firstName').isString().withMessage('firstName must be a string'),
    body('lastName').isString().withMessage('lastName must be a string'),
    body('address').isString().withMessage('address must be a string'),
    body('city').isString().withMessage('city must be a string'),
    body('zip').isInt({min: 1}).withMessage('zip must be a positive integer'),
    body('phone').isInt({min: 1}).withMessage('phone must be a positive integer'),
    body('email').isEmail().withMessage('email must be a valid email'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        next();
    },
];

export const validateUpdateCustomer = [
    param('id').isString().withMessage('id must be a string'),
    body('firstName').isString().withMessage('firstName must be a string'),
    body('lastName').isString().withMessage('lastName must be a string'),
    body('address').isString().withMessage('address must be a string'),
    body('city').isString().withMessage('city must be a string'),
    body('zip').isInt({min: 1}).withMessage('zip must be a positive integer'),
    body('phone').isInt({min: 1}).withMessage('phone must be a positive integer'),
    body('email').isEmail().withMessage('email must be a valid email'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        next();
    },
];