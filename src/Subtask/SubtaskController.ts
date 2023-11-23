import {Request, Response} from "express";
import SubtaskService from "./SubtaskService.js";


export default class SubtaskController {
    constructor() {}

    public async updateSubtaskStatusExecutor(request: Request<ReqParams, {}, { taskInstanceId: number }, {}>, response: Response) {
        const subtaskId = parseInt(request.params.id);
        const taskInstanceId = request.body.taskInstanceId;

        
        try {
            if (!subtaskId || !taskInstanceId) {
                response.status(400).json({ message: "taskInstanceId is missing or subtaskId is not of type number" })
                return;
            }
    
            const subtaskService = new SubtaskService();
            await subtaskService.updateSubtaskStatus(subtaskId, taskInstanceId);

            response.status(200).json({});
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }
}