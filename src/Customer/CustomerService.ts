import Pagination from "../Pagination.js";
import CustomerRepository from "./CustomerRepository.js";


export default class CustomerService extends Pagination{

    constructor() {
        super()
    }

    public async getAllCustomers({sortBy, sortDir, pageSize, pageNum, searchValue, filterBy}: any) {
        const customerRepository = new CustomerRepository();
        this.calculateOffset(pageSize, pageNum);

        /*if (searchValue && filterBy) {
            //return
        }


        if (filterBy) {
            //return
        }*/

        if (searchValue) {
            return customerRepository.getAllItemsSearchPagination(pageSize, this.offset, sortBy, sortDir, searchValue);
        }

        return customerRepository.getAllItemsPagination(pageSize, this.offset, sortBy, sortDir);
    }

    protected override calculateOffset(pageSize: number, pageNum: number) {
        super.calculateOffset(pageSize, pageNum);
    }
}