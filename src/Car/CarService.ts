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
}
