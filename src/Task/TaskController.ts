import { Request, Response } from "express";
import TaskService from "./TaskService.js";

export default class TaskController {
    constructor() {}

    public async initiateTaskExecutor(request: Request<ReqParams, {}, { employeeId: string }, {}>, response: Response) {
        const taskInstanceId = parseInt(request.params.id);
        const {employeeId} = request.body;

        try {
            if (!taskInstanceId || !employeeId) {
                response.status(400).json({ error: "One or more ids are missing" });
                return;
            }

            const taskService = new TaskService();
            const result = await taskService.initiateTask(taskInstanceId, employeeId);
            console.log(result);

            if (!result) {
                response.status(400).json({ message: 'Task instance is neither "AWAITING_CUSTOMER" or "PENDING"' });
                return;
            }

            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    public async getTasksExecutor(_request: Request, response: Response) {
        try {
            const taskService = new TaskService();
            const result = await taskService.getTasks();
            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    public async createCommentExecutor(request: Request<ReqParams, {}, { comment: string, employeeId: string }, {}>, response: Response) {
        const taskInstanceId = parseInt(request.params.id);
        const { comment, employeeId } = request.body;

        try {
            if (!taskInstanceId || !comment || !employeeId) {
                response.status(400).json({ error: "One or more props are missing" });
                return;
            }

            const taskService = new TaskService();
            const createdComment = await taskService.createComment(taskInstanceId, comment, employeeId);
            response.status(200).json(createdComment);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    public async getSingleTaskExecutor(request: Request<ReqParams, {}, {}, {}>, response: Response) {
        const taskInstanceId = parseInt(request.params.id);

        try {
            if (!taskInstanceId) {
                response.status(400).json({ error: "Task instance id is missing" });
                return;
            }

            const taskService = new TaskService();
            const result = await taskService.getSingleTask(taskInstanceId);
            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }
}
