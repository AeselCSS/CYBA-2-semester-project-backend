import {Request, Response} from "express";
import SubtaskService from "./SubtaskService.js";
import OrderService from "../Order/OrderService.js";
import errorHandler from "../Utility/errorHandler.js";

export default class SubtaskController {
    constructor() {}

    public async updateSubtaskStatusExecutor(request: Request<ReqParams, {}, { taskInstanceId: number }, {}>, response: Response) {
        //TODO burde udelukkende modtage subtaskInstance_id (som req.params) i stedet for subtask_id og task_instance_id tilsammen
        const subtaskId = parseInt(request.params.id);
        const taskInstanceId = request.body.taskInstanceId;
        
        
        try {
            const subtaskService = new SubtaskService();
            const orderService = new OrderService();

            const orderId = await subtaskService.updateSubtaskStatus(subtaskId, taskInstanceId);
            const order = await orderService.getSingleOrder(orderId)

            response.status(200).json(order);
        } catch (error: any) {
            errorHandler(error, response)
        }
    }
}