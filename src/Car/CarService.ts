import Pagination from '../Utility/Pagination.js';
import CarRepository from './CarRepository.js';
import { synsbasenToken, synsbasenURL } from '../server.js';
import { singleCarDTO, synsbasenCarDetailsDTO } from './CarDTO.js';

export default class CarService extends Pagination {
    constructor() {
        super();
    }

    public async getAllCars(queryParams: QueryType) {
        const { sortBy, sortDir, pageSize, pageNum, searchValue } = queryParams;
        const carRepository = new CarRepository();
        this.calculateOffset(pageSize, pageNum);

        return carRepository.getAllCars(
            pageSize,
            this.offset,
            sortBy,
            sortDir,
            searchValue
        );
    }

    public async getSingleCar(id: number) {
        const carRepository = new CarRepository();
        const rawCar = await carRepository.getSingleCar(id);
        return singleCarDTO(rawCar);
    }

    public async createCar(car: NewCar) {
        const carRepository = new CarRepository();
        const newCar = {
            ...car,
            firstRegistration: new Date(car.firstRegistration),
            lastInspectionDate: car.lastInspectionDate ? new Date(car.lastInspectionDate) : null,
        }
        
        return carRepository.createCar(newCar);
    }

    public async updateCar(id: number, mileage: number) {
        const carRepository = new CarRepository();

        return carRepository.updateCar(id, mileage);
    }

    public async deleteCar(id: number) {
        const carRepository = new CarRepository();
        return carRepository.deleteCar(id);
    }

    public async getCarDetailsSynsbasen(registrationNumber: string) {
        const response = await fetch(
            `${synsbasenURL}/vehicles/registration/${registrationNumber}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${synsbasenToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                'Failed to get car details from Synsbasen API with ' +
                    registrationNumber
            );
        }

        const carDetails = await response.json();
        return synsbasenCarDetailsDTO(carDetails.data);
    }
}
