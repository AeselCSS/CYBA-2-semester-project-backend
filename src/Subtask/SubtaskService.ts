import { Status } from "@prisma/client";
import TaskRepository from "../Task/TaskRepository.js";
import SubtaskRepository from "./SubtaskRepository.js";
import prisma from "../Database/PrismaClient.js";



export default class SubtaskService {
    constructor() {}

    public async updateSubtaskStatus(subtaskId: number, taskInstanceId: number) {
        const subtaskRepository = new SubtaskRepository();
        const taskRepository = new TaskRepository()
        

        await subtaskRepository.completeSubtask(subtaskId, taskInstanceId);

        const orderId = await taskRepository.getOrderIdByTaskInstanceId(taskInstanceId);
        const taskInstancesInOrder = await taskRepository.getTaskInstancesInSingleOrder(orderId);
        
        for (const taskInstance of taskInstancesInOrder) {
            if (taskInstance.status === Status.IN_PROGRESS || taskInstance.status === Status.PENDING) {
                return;
            }
        }

        //! SKAL KALDE PÅ EN METODE PATCH STATUS ORDER INDE I ORDER REPOSITORY!!
        return prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: Status.COMPLETED
            }
        })
        //!
    }
}