import {query, body, validationResult, param} from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCarQuery = [
    query('sortBy').isString().withMessage('sortBy must be a string'),
    query('sortDir').isString().isIn(['asc', 'desc']).withMessage("sortDir must be either 'asc' or 'desc' "),
    query('pageSize').isInt({ min: 1 }).withMessage('pageSize must be a positive integer'),
    query('pageNum').isInt({ min: 1 }).withMessage('pageNum must be a positive integer'),
    query('searchValue').optional().isString().withMessage('Search value must be a string.'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateCreateCar = [
    body('registrationNumber').isString().withMessage('registrationNumber must be a string'),
    body('vinNumber').isString().withMessage('vinNumber must be a string'),
    body('brand').isString().withMessage('brand must be a string'),
    body('model').isString().withMessage('model must be a string'),
    body('modelVariant').isString().withMessage('modelVariant must be a string'),
    body('customerId').isString().withMessage('customerId must be a string'),
    body('firstRegistration').isString().withMessage('firstRegistration must be a string'),
    body('mileage').isInt({ min: 1 }).withMessage('mileage must be a positive integer'),
    body('lastInspectionDate').isString().withMessage('lastInspectionDate must be a string'),
    body('lastInspectionKind').isString().withMessage('lastInspectionKind must be a string'),
    body('lastInspectionResult').isString().withMessage('lastInspectionResult must be a string'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateUpdateMileageOnCar = [
    param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
    body('mileage').isInt({ min: 1 }).withMessage('mileage must be a positive integer'),
    (request: Request, response: Response, next: NextFunction): Response | void => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

