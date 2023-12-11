import { Status, Task } from '@prisma/client';
import Pagination from '../Utility/Pagination.js';
import {orderDTO, ordersDTO, ordersStartDatesDTO} from './OrderDTO.js';
import OrderRepository from './OrderRepository.js';

export default class OrderService extends Pagination {
    constructor() {
        super();
    }

    public async getAllOrders(queries: OrderQueryType) {
        const { sortBy, sortDir, pageSize, pageNum, searchValue, filterBy } = queries;

        const orderRepository = new OrderRepository();
        this.calculateOffset(pageSize, pageNum);

        const orderResult = await orderRepository.getAllOrders(pageSize, this.offset, sortBy, sortDir, searchValue, filterBy);
        return ordersDTO(orderResult);
    }

    public async getSingleOrder(id: number) {
        const orderRepository = new OrderRepository();
        const result = await orderRepository.getSingleOrder(id);
        const orderDTOResult = await orderDTO(result);

        //Add the total time of all subtasks in the order
        orderDTOResult.totalTime = orderDTOResult.tasks.reduce((acc, item) => item.totalTime + acc, 0);
        return orderDTOResult;
    }

    public async updateOrderStatus(id: number, status: Status) {
        const orderRepository = new OrderRepository();
        // check status guard
        const orderStatus = await orderRepository.getOrderStatus(id);

        if (orderStatus.status === 'COMPLETED') {
            throw new Error(`Order is ${orderStatus.status.toLowerCase()}`);
        }

        return orderRepository.updateOrderStatus(id, status);
    }

    public async updateOrderTasks(id: number, tasks: Task[]) {
        const orderRepository = new OrderRepository();
        // check status guard
        const orderStatus = await orderRepository.getOrderStatus(id);

        if (orderStatus.status === "COMPLETED" || orderStatus.status === "IN_PROGRESS" || orderStatus.status === "CANCELLED") {
            throw new Error(`Order is ${orderStatus.status.toLowerCase()}`);
        }

        const { taskInstances } = await orderRepository.getOrderTasks(id);

        // Convert incoming tasks to a Set of IDs for easy comparison
        const taskIds = new Set(tasks.map((task) => task.id));

        // Tasks to delete: present in taskInstances but not in incoming tasks
        const tasksToDelete = taskInstances.filter(
            (instance) => !taskIds.has(instance.id)
        );

        // Tasks to add: present in incoming tasks but not in taskInstances
        const existingTaskIds = new Set(
            taskInstances.map((instance) => instance.id)
        );
        const tasksToAdd = tasks.filter(
            (task) => !existingTaskIds.has(task.id)
        );

        // SubTasks to add
        const subTaskstoAdd = await orderRepository.getTaskSubtasks(tasksToAdd);

        await orderRepository.updateOrderTasks(
            id,
            tasksToDelete,
            tasksToAdd,
            subTaskstoAdd
        );

        const updatedOrder = await orderRepository.getSingleOrder(id);
        return orderDTO(updatedOrder);
    }


    public async getAllOrdersStartDates() {
        const orderRepository = new OrderRepository();

        const rawDates = await orderRepository.getAllOrdersStartDates();
        return ordersStartDatesDTO(rawDates)
    }

    public async createOrder(order: NewOrder) {
        const orderRepository = new OrderRepository();

        const { tasks } = order;

        // find all subtasks for each task
        const subTasks = await orderRepository.getTaskSubtasks(tasks);

        const orderId = await orderRepository.createOrder(order, subTasks);
        const createdOrder = await orderRepository.getSingleOrder(orderId);
        return orderDTO(createdOrder);
    }
}
