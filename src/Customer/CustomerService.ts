import Pagination from "../Utility/Pagination.js";
import CustomerRepository from "./CustomerRepository.js";

export default class CustomerService extends Pagination {
    constructor() {
        super();
    }

    public async getAllCustomers({ sortBy, sortDir, pageSize, pageNum, searchValue }: QueryType) {
        const customerRepository = new CustomerRepository();
        this.calculateOffset(pageSize, pageNum);

        //If searchValue is defined
        if (searchValue) {
            return customerRepository.getAllItemsSearchPagination(pageSize, this.offset, sortBy, sortDir, searchValue);
        }

        return customerRepository.getAllItemsPagination(pageSize, this.offset, sortBy, sortDir);
    }

    public async getSingleCustomer(id: string) {
        const customerRepository = new CustomerRepository();

        return customerRepository.getSingleCustomer(id);
    }

    public async updateCustomer(id: string, customerReqBody: CustomerReqBody) {
        const customerRepository = new CustomerRepository();

        return customerRepository.updateCustomer(id, customerReqBody);
    }

    public async deleteCustomer(id: string) {
        const customerRepository = new CustomerRepository();

        return customerRepository.deleteCustomer(id);
    }

    public async createCustomer(customerReqBody: CustomerReqBody) {
        const customerRepository = new CustomerRepository();
        return customerRepository.createCustomer(customerReqBody);
    }
}
