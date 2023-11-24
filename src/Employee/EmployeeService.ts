import EmployeeRepository from "./EmployeeRepository.js";
import Pagination from "../Utility/Pagination.js";
import { Department, Role } from "@prisma/client";


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

    public async createEmployee(firstName: string, lastName: string, department: Department, role: Role, id: string) {
        const employeeRepository = new EmployeeRepository();
        
        const isEmployeeInDB = await employeeRepository.isExistingEmployee(id);

        if (isEmployeeInDB) {
            return null;
        }

        return await employeeRepository.createEmployee(id, firstName, lastName, department, role);
    }
}