import TaskRepository from "./TaskRepository.js";
import { Status } from "@prisma/client";
import SubtaskRepository from "../Subtask/SubtaskRepository.js"
export default class TaskService {
    constructor() {}

    public async initiateTask(taskId: number, orderId: number) {
        const taskRepository = new TaskRepository();
        const subtaskRepository = new SubtaskRepository()

        const [taskInstance] = await taskRepository.getSingleTaskInstance(taskId, orderId);

        
        if (taskInstance.status === Status.AWAITING_CUSTOMER || taskInstance.status === Status.PENDING) {
            await taskRepository.updateTaskInstanceStatus(taskId, orderId, Status.IN_PROGRESS);

            //Get all subtasks for the task, we have just updated to IN_PROGRESSS
            const subtasks = await subtaskRepository.getSubtasksForASingleTask(taskId);
            const firstSubTask = subtasks[0];
            
            //Update the status on the first subtask to IN_PROGRESS
            await subtaskRepository.updateSubtaskStatus(firstSubTask.subtaskId, taskInstance.id, Status.IN_PROGRESS)

            //return the updated taskInstance with the updated status;
            const [result] = await taskRepository.getSingleTaskInstance(taskId, orderId);
            return result;
        }


        return null;
    }

    public async getTasks() {
        const taskRepository = new TaskRepository();
        return await taskRepository.getTasks();
    }
}
