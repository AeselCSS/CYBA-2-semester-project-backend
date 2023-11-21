import EmployeeRepository from "./EmployeeRepository.js";
import Pagination from "../Utility/Pagination.js";


export default class EmployeeService extends Pagination{

    constructor() {
        super();
    }


    public async getAllEmployees({sortBy, sortDir, pageSize, pageNum, searchValue, filterBy}: QueryType ) {
        const employeeRepository = new EmployeeRepository();
        this.calculateOffset(pageSize, pageNum);

        if (searchValue && filterBy) {

        }

        if (searchValue) {

        }

        if (filterBy) {

        }
    }
}