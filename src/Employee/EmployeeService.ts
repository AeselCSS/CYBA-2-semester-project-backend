import EmployeeRepository from "./EmployeeRepository.js";
import Pagination from "../Utility/Pagination.js";


export default class EmployeeService extends Pagination {
    constructor() {
        super();
    }

    public async getAllEmployees({ sortBy, sortDir, pageSize, pageNum, searchValue, filterBy }: EmployeeQueryType) {
        const employeeRepository = new EmployeeRepository();
        this.calculateOffset(pageSize, pageNum);

        if (searchValue && filterBy) {
            return employeeRepository.getAllItemsAllPagination(pageSize, this.offset, sortBy, sortDir, searchValue, filterBy);
        }

        if (searchValue) {
            return employeeRepository.getAllItemsSearchPagination(pageSize, this.offset, sortBy, sortDir, searchValue)
        }

        if (filterBy) {
            return employeeRepository.getAllItemsFilterPagination(pageSize, this.offset, sortBy, sortDir, filterBy)
        }

        return employeeRepository.getAllItemsPagination(pageSize, this.offset, sortBy, sortDir)
    }

    public async getSingleEmployee(id: string) {
        const employeeRepository = new EmployeeRepository();

        return await employeeRepository.getSingleEmployee(id);
    }
}