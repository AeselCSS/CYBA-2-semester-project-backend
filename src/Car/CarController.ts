import { Request, Response } from 'express';
import errorHandler from '../Utility/errorHandler.js';
import CarService from './CarService.js';
import { Car } from '@prisma/client';

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
                response.status(404).json({ message: 'Missing queries' });

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

    public async getSingleCarExecuter(
        request: Request<ReqParams, {}, {}, ReqQuery>,
        response: Response
    ) {
        const { id } = request.params;

        try {
            if (!id) response.status(404).json({ message: 'Id missing' });

            const carService = new CarService();
            const result: Car | null = await carService.getSingleCar(
                parseInt(id)
            );
            if (!result) throw new Error('Car not found');

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async createCarExecuter(
        request: Request<ReqParams, {}, NewCar, ReqQuery>,
        response: Response
    ) {
        const {
            registrationNumber,
            vinNumber,
            model,
            brand,
            modelVariant,
            customerId,
            firstRegistration,
            mileage,
            lastInspectionDate,
            lastInspectionKind,
            lastInspectionResult,
        } = request.body;

        try {
            if (
                !registrationNumber ||
                !vinNumber ||
                !model ||
                !brand ||
                !modelVariant ||
                !customerId ||
                !firstRegistration ||
                !mileage ||
                !lastInspectionDate ||
                !lastInspectionKind ||
                !lastInspectionResult
            )
                response.status(404).json({ message: 'Missing data' });

            const newCar: NewCar = {
                registrationNumber,
                vinNumber,
                model,
                brand,
                modelVariant,
                customerId,
                firstRegistration,
                mileage,
                lastInspectionDate,
                lastInspectionKind,
                lastInspectionResult,
            };
            const carService = new CarService();
            const result: Car = await carService.createCar(newCar);

            response.status(201).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async updateMileageOnCarExecuter(
        request: Request<ReqParams, {}, {mileage: string}, ReqQuery>,
        response: Response
    ) {
        const { id } = request.params;
        const { mileage } = request.body;

        try {
            if (!id || !mileage) response.status(404).json({ message: 'Missing data' });

            const carService = new CarService();
            const result: Car = await carService.updateCar(
                parseInt(id),
                parseInt(mileage)
            );

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async deleteCarExecuter(
        request: Request<ReqParams, {}, {}, ReqQuery>,
        response: Response
    ) {
        const { id } = request.params;

        try {
            if (!id) throw new Error('Id missing');

            const carService = new CarService();
            const result = await carService.deleteCar(parseInt(id));
            if (!result) response.status(404).json({ message: 'Car not found' });
            response
                .status(200)
                .json({ message: `Car with id: ${id} deleted` });
        } catch (error: any) {
            errorHandler(error, response);
        }
    }
}
