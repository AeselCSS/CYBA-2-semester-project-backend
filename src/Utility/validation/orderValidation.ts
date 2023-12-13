import {query, body, validationResult, param} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const validateOrderQuery = [
    query('sortBy').isString().isIn(['id', 'status', 'orderStartDate', 'carId', 'customerId', 'createdAt', 'updatedAt']).withMessage("sortBy must be either 'id', 'status', 'orderStartDate', 'carId', 'customerId', 'createdAt', 'updatedAt' "),
    query('sortDir').isString().isIn(['asc', 'desc']).withMessage("sortDir must be either 'asc' or 'desc' "),
    query('pageSize').isInt({ min: 1 }).withMessage('Page Size must be a positive integer'),
    query('pageNum').isInt({ min: 1 }).withMessage('Page Number must be a positive integer'),
    query('searchValue').optional().custom((value) => {
        // Check if the value is an integer
        if (!isNaN(value) && parseInt(value) == value) {
            return true; // It's a valid integer
        }
        // Check if the value is a string
        if (typeof value === 'string') {
            return true; // It's a valid string
        }
        throw new Error('Search Value must be either a string or an integer');
    }),

    query('filterBy').optional().isString().isIn(['','AWAITING_CUSTOMER', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).withMessage("Filter By must be either 'AWAITING_CUSTOMER', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED' or '' "),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateUpdateOrderStatus = [
    param('id').isInt().withMessage('Order ID must be an integer.'),
    body('status').isString().isIn(['PENDING', 'IN_PROGRESS', 'CANCELLED']).withMessage('Status must be a string.'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateUpdateOrderTasks = [
    param('id').isInt().withMessage('Order ID must be an integer.'),
    body('tasks').isArray().withMessage('Tasks must be an array.'),
    body('tasks.*.description').isString().withMessage('Task description must be a string.'),
    body('tasks.*.name').isString().withMessage('Task name must be a string.'),
    body('tasks.*.id').isInt().withMessage('Task ID must be an integer.'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateCreateOrder = [
    body('orderStartDate').isISO8601().withMessage('Order start date must be a valid date.'),
    body('carId').isInt().withMessage('Car ID must be an integer.'),
    body('customerId').isString().withMessage('Customer ID must be an string.'),
    body('tasks')
        .isArray().withMessage('Tasks must be an array.')
        .custom((tasks: any[]) => {
            // Check if every item in the array is an object with an 'id' property
            if (!tasks.every((task) => typeof task === 'object' && task !== null && 'id' in task)) {
                throw new Error('Tasks must be an array of objects with an "id" property.');
            }
            return true;
        }),
    body('tasks.*.id').isInt({ min: 1 }).withMessage('Task ID must be an integer.'),

    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

