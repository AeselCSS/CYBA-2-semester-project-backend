import { Request, Response } from "express";
import errorHandler from "../Utility/errorHandler.js";
import OrderService from "./OrderService.js";
import { Status, Task } from "@prisma/client";

export default class OrderController {
    constructor() {}

    public async getAllOrdersExecutor(request: Request<{}, {}, {}, ReqQuery>, response: Response) {
        const queries: OrderQueryType = {
            ...request.query,
            pageSize: parseInt(request.query.pageSize),
            pageNum: parseInt(request.query.pageNum),
            filterBy: request.query.filterBy as Status,
        }

        try {
            const orderService = new OrderService();
            const result = await orderService.getAllOrders(queries);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async getSingleOrderExecutor(request: Request<ReqParams, {}, {}, {}>, response: Response) {
        const id = parseInt(request.params.id);
        try {
            if (!id) {
                response.status(400).json({ error: "id is not a number" });
                return;
            }

            const orderService = new OrderService();
            const result = await orderService.getSingleOrder(id);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async updateOrderStatusExecutor(request: Request<ReqParams, {}, { status: Status }, {}>, response: Response) {
        const id = parseInt(request.params.id);
        const { status } = request.body;

        try {
            if (!id) {
                response.status(400).json({ error: "id is not a number" });
                return;
            } else if (!status) {
                response.status(400).json({ error: "status is missing" });
                return;
            }

            const orderService = new OrderService();
            const result = await orderService.updateOrderStatus(id, status);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async updateOrderTasksExecutor(request: Request<ReqParams, {}, { tasks: Task[] }, {}>, response: Response) {
        const id = parseInt(request.params.id);
        const tasks = request.body.tasks;

        try {
            if (!id) {
                response.status(400).json({ error: "id is not a number" });
                return;
            } else if (!tasks) {
                response.status(400).json({
                    error: "tasks is missing. Check if it is wrapped in an array",
                });
                return;
            }

            const orderService = new OrderService();
            const result = await orderService.updateOrderTasks(id, tasks);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    // newOrder status, orderStartDate, carId, customerId, tasks

    public async createOrderExecutor(request: Request<{}, {}, NewOrder, {}>, response: Response) {
        const { orderStartDate, carId, customerId, tasks } = request.body;

        try {
            if (!orderStartDate || !carId || !customerId || !tasks) {
                response.status(400).json({ error: "order parameters are missing" });
                return;
            }

            const newOrder: NewOrder = {
                status: Status.AWAITING_CUSTOMER,
                orderStartDate: new Date(orderStartDate),
                carId,
                customerId,
                tasks,
            };

            const orderService = new OrderService();
            const result = await orderService.createOrder(newOrder);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }
}
