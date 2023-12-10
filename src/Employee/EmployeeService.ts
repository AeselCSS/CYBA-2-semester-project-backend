import EmployeeRepository from "./EmployeeRepository.js";
import Pagination from "../Utility/Pagination.js";
import { Department, Role } from "@prisma/client";


export default class EmployeeService extends Pagination {
    constructor() {
        super();
    }

    public async getAllEmployees(queryParams: EmployeeQueryType) {
        const { sortBy, sortDir, pageSize, pageNum, searchValue, filterBy } = queryParams;
        const employeeRepository = new EmployeeRepository();
        this.calculateOffset(pageSize, pageNum);

        return employeeRepository.getAllEmployees(pageSize, this.offset, sortBy, sortDir, searchValue, filterBy);
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