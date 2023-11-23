import SubtaskRepository from "./SubtaskRepository.js";



export default class SubtaskService {
    constructor() {}

    public async updateSubtaskStatus(subtaskId: number, taskInstanceId: number) {
        const subtaskRepository = new SubtaskRepository();

        return subtaskRepository.completeSubtask(subtaskId, taskInstanceId);
        
        
    }
}