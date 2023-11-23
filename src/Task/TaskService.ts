import TaskRepository from "./TaskRepository.js";
import { Status } from "@prisma/client";
export default class TaskService {
    constructor() {}

    public async initiateTask(taskId: number, orderId: number) {
        const taskRepository = new TaskRepository();

        const [taskInstance] = await taskRepository.getSingleTaskInstance(taskId, orderId);

        if (taskInstance.status === Status.AWAITING_CUSTOMER || taskInstance.status === Status.PENDING) {
            await taskRepository.initiateTaskInstance(taskId, orderId);
            const [result] = await taskRepository.getSingleTaskInstance(taskId, orderId)
            return result;
        } 

        return null;
    }
}
