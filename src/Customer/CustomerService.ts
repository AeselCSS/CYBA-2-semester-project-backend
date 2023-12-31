import Pagination from "../Utility/Pagination.js";
import CustomerRepository from "./CustomerRepository.js";
import {singleCustomerDTO} from "./CustomerDTO.js";
import OrderRepository from "../Order/OrderRepository.js";
import CarRepository from "../Car/CarRepository.js";
import {Car} from "@prisma/client";


export default class CustomerService extends Pagination {

    constructor() {
        super();
    }

    public async getAllCustomers(queryParams: QueryType) {
        const { sortBy, sortDir, pageSize, pageNum, searchValue } = queryParams;
        const customerRepository = new CustomerRepository();
        this.calculateOffset(pageSize, pageNum);

        return customerRepository.getAllCustomers(pageSize, this.offset, sortBy, sortDir, searchValue);
    }

    public async getSingleCustomer(id: string) {
        const customerRepository = new CustomerRepository();
        const customerDate = await customerRepository.getSingleCustomer(id);

        return singleCustomerDTO(customerDate);
    }

    public async getAllOrdersByCustomerId(id: string, pageNum: number, pageSize: number) {
        const orderRepository = new OrderRepository();
        this.calculateOffset(pageSize, pageNum);

        const customerCars: Car[] = await this.getAllCarsByCustomerId(id);
        const customerCarsIds: number[] = customerCars.map(car => car.id);

        return await orderRepository.getAllOrdersByCustomerId(id, customerCarsIds, pageSize, this.offset, "orderStartDate", "desc");
    }

    public async getAllCarsByCustomerId(id: string) {
        const carRepository = new CarRepository();

        return carRepository.getAllCarsByCustomerId(id)
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

        const isCustomerInDB = await customerRepository.isExistingCustomer(customerReqBody.id, customerReqBody.email);

        if (isCustomerInDB) {
            return null;
        }

        return customerRepository.createCustomer(customerReqBody);
    }
}
