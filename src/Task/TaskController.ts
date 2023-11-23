import { Request, Response } from "express";
import TaskService from "./TaskService.js";

export default class TaskController {
    constructor() {}

    public async initiateTaskExecutor(request: Request<ReqParams, {}, { orderId: number }, {}>, response: Response) {
        const taskId = parseInt(request.params.id);
        const orderId = request.body.orderId;

        try {
            if (!taskId || !orderId) {
                response.status(400).json({ error: "Id is not a number" });
                return;
            }

            const taskService = new TaskService();
            const result = await taskService.initiateTask(taskId, orderId);
            console.log(result);
            

            if (!result) {
                response.status(400).json({ message: 'Task instance is neither "AWAITING_CUSTOMER" or "PENDING"' })
                return;
            } 

            response.status(200).json(result)
            
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }
}
