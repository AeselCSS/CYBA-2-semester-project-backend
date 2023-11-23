import TaskRepository from "./TaskRepository.js";
import { Status } from "@prisma/client";

export default class TaskService {
    constructor() {}

    public async initiateTask(taskInstanceId: number, employeeId: string) {
        const taskRepository = new TaskRepository();
        
        const taskInstance = await taskRepository.getSingleTaskInstance(taskInstanceId);

        if (taskInstance.status === Status.AWAITING_CUSTOMER || taskInstance.status === Status.PENDING) {
            //Transaction
            await taskRepository.initiateTaskInstance(taskInstance, employeeId);

            //return the updated taskInstance with the updated status;
            const result = await taskRepository.getSingleTaskInstance(taskInstanceId);
            return result;
        }

        return null;
    }

    public async getTasks() {
        const taskRepository = new TaskRepository();
        return await taskRepository.getTasks();
    }
}
