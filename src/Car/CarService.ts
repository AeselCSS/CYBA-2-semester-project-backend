import Pagination from '../Utility/Pagination.js';
import CarRepository from './CarRepository.js';

export default class CarService extends Pagination {
    constructor() {
        super();
    }

    public async getAllCars({
        sortBy,
        sortDir,
        pageSize,
        pageNum,
        searchValue,
    }: QueryType) {
        const carRepository = new CarRepository();
        this.calculateOffset(pageSize, pageNum);

        //If searchValue is defined
        if (searchValue) {
            return carRepository.getAllItemsSearchPagination(
                pageSize,
                this.offset,
                sortBy,
                sortDir,
                searchValue
            );
        }

        return carRepository.getAllItemsPagination(
            pageSize,
            this.offset,
            sortBy,
            sortDir
        );
    }

    public async getSingleCar(id: number) {
        const carRepository = new CarRepository();
        return carRepository.getSingleCar(id);
    }

    public async createCar(car: NewCar) {
        const carRepository = new CarRepository();
        const newCar = {
            ...car,
            firstRegistration: new Date(car.firstRegistration),
            lastInspectionDate: new Date(car.lastInspectionDate),
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
}
