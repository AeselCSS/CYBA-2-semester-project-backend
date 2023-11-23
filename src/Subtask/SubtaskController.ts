import {Request, Response} from "express";
// import SubtaskService from "./SubtaskService.js";


export default class SubtaskController {
    constructor() {}

    public async updateSubtaskStatusExecutor(request: Request<ReqParams, {}, { taskInstanceId: number }, {}>, response: Response) {
        const subtaskId = parseInt(request.params.id);
        const taskInstanceId = request.body.taskInstanceId;

        if (!subtaskId || !taskInstanceId) {
            response.status(400).json({ message: "taskInstanceId is missing or subtaskId is not of type number" })
            return;
        }

        // const subtaskService = new SubtaskService();
        // const result = await sub
    }
}