import { Request, Response } from "express";
import errorHandler from "../Utility/errorHandler.js";
import OrderService from "./OrderService.js";
import { Status, Task } from "@prisma/client";

export default class OrderController {
    constructor() {}

    public async getAllOrdersExecutor(request: Request<{}, {}, {}, ReqQuery>, response: Response) {
        const { sortDir, sortBy, pageNum, pageSize, searchValue, filterBy } = request.query;

        try {
            if (!sortDir || !sortBy || !pageNum || !pageSize) response.status(400).json({ error: "Queries missing" });

            const queries = {
                sortBy,
                sortDir,
                pageSize: parseInt(pageSize),
                pageNum: parseInt(pageNum),
                searchValue: searchValue,
                filterBy: filterBy,
            };

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
        const status = request.body.status;

        try {
            if (!id) {
                response.status(400).json({ error: "id is not a number" });
                return;
            } else if (!status) {
                response.status(400).json({ error: "status is missing" });
                return;
            }

            const orderService = new OrderService();
            await orderService.updateOrderStatus(id, status);

            response.status(200).json({});
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
                response.status(400).json({ error: "tasks is missing. Check if it is wrapped in an array" });
                return;
            }

            const orderService = new OrderService();
            await orderService.updateOrderTasks(id, tasks);

            response.status(200).json({});
        } catch (error: any) {
            errorHandler(error, response);
        }
    }
}
