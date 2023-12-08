import {Request, Response} from "express";
import SubtaskService from "./SubtaskService.js";
import OrderService from "../Order/OrderService.js";
import errorHandler from "../Utility/errorHandler.js";

export default class SubtaskController {
    constructor() {}

    public async updateSubtaskStatusExecutor(request: Request<ReqParams, {}, {}, {}>, response: Response) {
        const id = parseInt(request.params.id);

        try {
            const subtaskService = new SubtaskService();
            const orderService = new OrderService();

            const orderId = await subtaskService.updateSubtaskStatus(id);
            const order = await orderService.getSingleOrder(orderId)

            response.status(200).json(order);
        } catch (error: any) {
            errorHandler(error, response)
        }
    }
}