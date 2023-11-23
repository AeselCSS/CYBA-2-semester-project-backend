import { Status } from "@prisma/client";
import SubtaskRepository from "./SubtaskRepository.js";



export default class SubtaskService {
    constructor() {}

    public async updateSubtaskStatus(subtaskId: number, taskInstanceId: number) {
        const subtaskRepository = new SubtaskRepository();

        await subtaskRepository.updateSubtaskStatus(subtaskId, taskInstanceId, Status.COMPLETED);
        
        
    }
}