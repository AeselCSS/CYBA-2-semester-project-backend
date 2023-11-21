import Pagination from "../Utility/Pagination.js";
import CustomerRepository from "./CustomerRepository.js";
import {QueryType} from "../shared.types.js";



export default class CustomerService extends Pagination{

    constructor() {
        super()
    }

    public async getAllCustomers({sortBy, sortDir, pageSize, pageNum, searchValue}: QueryType) {
        const customerRepository = new CustomerRepository();
        this.calculateOffset(pageSize, pageNum);



        //If searchValue is defined
        if (searchValue) {
            return customerRepository.getAllItemsSearchPagination(pageSize, this.offset, sortBy, sortDir, searchValue);

        }

        return customerRepository.getAllItemsPagination(pageSize, this.offset, sortBy, sortDir);
    }

}