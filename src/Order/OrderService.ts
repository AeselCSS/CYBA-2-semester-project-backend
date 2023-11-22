import { Status, Task } from "@prisma/client";
import Pagination from "../Utility/Pagination.js";
import { orderDTO, ordersDTO } from "./OrderDTO.js";
import OrderRepository from "./OrderRepository.js";

export default class OrderService extends Pagination {
    constructor() {
        super();
    }

    public async getAllOrders({ pageNum, pageSize, sortBy, sortDir, filterBy, searchValue }: OrderQueryType) {
        const orderRepository = new OrderRepository();
        this.calculateOffset(pageSize, pageNum);
        const numericRegex: RegExp = /^[0-9]+$/;

        let orderResult: ResultPagination<any> = {};

        if (searchValue && filterBy) {
            if (numericRegex.test(searchValue)) {
                const searchValueInt = parseInt(searchValue);
                orderResult = await orderRepository.getAllItemsNumberAllPagination(pageSize, this.offset, sortBy, sortDir, searchValueInt, filterBy);
            } else {
                orderResult = await orderRepository.getAllItemsAllPagination(pageSize, this.offset, sortBy, sortDir, searchValue, filterBy);
            }

            return ordersDTO(orderResult);
        }

        if (searchValue) {
            if (numericRegex.test(searchValue)) {
                const searchValueInt = parseInt(searchValue);
                orderResult = await orderRepository.getAllItemsSearchNumberPagination(pageSize, this.offset, sortBy, sortDir, searchValueInt);
            } else {
                orderResult = await orderRepository.getAllItemsSearchPagination(pageSize, this.offset, sortBy, sortDir, searchValue);
            }

            return ordersDTO(orderResult);
        }

        if (filterBy) {
            orderResult = await orderRepository.getAllItemsFilterPagination(pageSize, this.offset, sortBy, sortDir, filterBy);
            return ordersDTO(orderResult);
        }

        orderResult = await orderRepository.getAllItemsPagination(pageSize, this.offset, sortBy, sortDir);
        return ordersDTO(orderResult);
    }

    public async getSingleOrder(id: number) {
        const orderRepository = new OrderRepository();
        const result = await orderRepository.getSingleOrder(id);
        return orderDTO(result);
    }

    public async updateOrderStatus(id: number, status: Status) {
        const orderRepository = new OrderRepository();

        return orderRepository.updateOrderStatus(id, status);
    }

    public async updateOrderTasks(id: number, tasks: Task[]) {
        const orderRepository = new OrderRepository();

        return orderRepository.updateOrderTasks(id, tasks);
    }
}
