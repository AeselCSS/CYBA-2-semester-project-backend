import { Request, Response } from 'express';
import errorHandler from '../Utility/errorHandler.js';
import CarService from './CarService.js';

export default class CarController {
    constructor() {}

    public async getAllCarsExecuter(
        request: Request<ReqParams, {}, {}, ReqQuery>,
        response: Response
    ) {
        const { sortDir, sortBy, pageNum, pageSize, searchValue } =
            request.query;

        try {
            if (!sortDir || !sortBy || !pageNum || !pageSize)
                throw new Error('Queries missing');

            const queries = {
                sortBy,
                sortDir,
                pageSize: parseInt(pageSize),
                pageNum: parseInt(pageNum),
                searchValue: searchValue,
            };

            const carService = new CarService();
            const result = await carService.getAllCars(queries);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }
}
