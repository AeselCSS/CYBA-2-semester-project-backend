import { Request, Response } from "express";
import errorHandler from "../Utility/errorHandler.js";
import CarService from "./CarService.js";
import { Car } from "@prisma/client";

export default class CarController {
    constructor() {}

    public async getAllCarsExecuter(request: Request<ReqParams, {}, {}, ReqQuery>, response: Response) {
        const queries = {
            ...request.query,
            pageSize: parseInt(request.query.pageSize),
            pageNum: parseInt(request.query.pageNum),
        }

        try {
            const carService = new CarService();
            const result = await carService.getAllCars(queries);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async getSingleCarExecuter(request: Request<ReqParams, {}, {}, ReqQuery>, response: Response) {
        const { id } = request.params;

        try {
            const carService = new CarService();
            const result = await carService.getSingleCar(parseInt(id));

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async createCarExecuter(request: Request<ReqParams, {}, NewCar, ReqQuery>, response: Response) {
        const newCar = request.body;

        try {
            const carService = new CarService();
            const result: Car = await carService.createCar(newCar);

            response.status(201).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async updateMileageOnCarExecuter(request: Request<ReqParams, {}, { mileage: string }, ReqQuery>, response: Response) {
        const { id } = request.params;
        const { mileage } = request.body;

        try {
            const carService = new CarService();
            const result: Car = await carService.updateCar(parseInt(id), parseInt(mileage));

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async deleteCarExecuter(request: Request<ReqParams, {}, {}, ReqQuery>, response: Response) {
        const { id } = request.params;

        try {
            const carService = new CarService();
            await carService.deleteCar(parseInt(id));
            
            response.status(204).json();
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async getCarDetailsSynsbasenExecutor(request: Request<{registrationNumber: string},{},{},{}>, response: Response) {
        const {registrationNumber} = request.params;

        try {
            const carService = new CarService();
            const result = await carService.getCarDetailsSynsbasen(registrationNumber);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }
}
