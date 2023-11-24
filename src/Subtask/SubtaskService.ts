import { Status } from "@prisma/client";
import TaskRepository from "../Task/TaskRepository.js";
import SubtaskRepository from "./SubtaskRepository.js";
import OrderRepository from "../Order/OrderRepository.js";



export default class SubtaskService {
    constructor() {}

    public async updateSubtaskStatus(subtaskId: number, taskInstanceId: number) {
        const subtaskRepository = new SubtaskRepository();
        const taskRepository = new TaskRepository()
        const orderRepository = new OrderRepository();

        //Update the subtaskInstance and taskInstance if necesseray in this transaction
        await subtaskRepository.completeSubtask(subtaskId, taskInstanceId);

        //Get the orderId
        const orderId = await taskRepository.getOrderIdByTaskInstanceId(taskInstanceId);

        //Use the orderId to get all taskInstances in the order
        const taskInstancesInOrder = await taskRepository.getTaskInstancesInSingleOrder(orderId);
        
        //Guard. Loop through taskInstances. If there still exists a taskInstance with status != COMPLETED, then exit the method and return to controller. 
        for (const taskInstance of taskInstancesInOrder) {
            if (taskInstance.status !== Status.COMPLETED) {
                //return orderId for the controller
                return orderId;
            }
        }

        //If you reach here, then all taskInstances are COMPLETED. We update the status on the order itself to COMPLETED
        await orderRepository.updateOrderStatus(orderId, Status.COMPLETED);
        
        //return orderId for the controller
        return orderId;
    }
}