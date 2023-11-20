import Pagination from "../Pagination.js";
import CustomerRepository from "./CustomerRepository.js";


export default class CustomerService extends Pagination{

    constructor() {
        super()
    }

    public async getAllCustomers({sortBy, sortDir, pageSize, pageNum, searchValue, filterBy}: any) {
        const customerRepository = new CustomerRepository();
        this.calculateOffset(pageSize, pageNum);

        if (searchValue && filterBy) {
            //TODO return Gå ind i repository allpagination
            //return
        }


        if (filterBy) {
            //return
        }

        if (searchValue) {
            //return
        }

        //TODO search og filter er ikke defineret. return kun pagination med sort
        return customerRepository.getCustomers(pageSize, this.offset, sortBy, sortDir)
    }

    protected override calculateOffset(pageSize: number, pageNum: number) {
        super.calculateOffset(pageSize, pageNum);
    }
}