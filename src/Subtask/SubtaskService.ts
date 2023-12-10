import TaskRepository from "../Task/TaskRepository.js";
import SubtaskRepository from "./SubtaskRepository.js";

export default class SubtaskService {
    constructor() {}

    public async updateSubtaskStatus(id: number) {
        const subtaskRepository = new SubtaskRepository();
        const taskRepository = new TaskRepository()

        //Get the subtaskInstance object
        const subtaskInstance = await subtaskRepository.getSingleSubtask(id);

        console.log(subtaskInstance);

        //Get the taskInstance that belongs to the subtaskInstance
        const taskInstance = await taskRepository.getSingleTaskInstance(subtaskInstance.taskInstanceId);


        console.log("TASKINSTANCE OBJECT");
        
        console.log(taskInstance);
        console.log("============");
        

        //Update the subtaskInstance- and taskInstance- and order status if necessary in this transaction
        await subtaskRepository.completeSubtask(id, taskInstance.id);

        //return orderId to controller
        return taskInstance.orderId
    }
}