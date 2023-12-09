import prisma from "../Database/PrismaClient.js";
import { Status } from "@prisma/client";

export default class SubtaskRepository {
    constructor() {}

    public async updateSubtaskStatus(id: number, newStatus: Status) {
        return prisma.subtaskInstance.update({
            where: {
                id: id
            },
            data: {
                status: newStatus,
            },
        });
    }

    public async completeSubtask(id: number, taskInstanceId: number) {

        return prisma.$transaction(async (prisma) => {
            //Finder taskIntance
            const taskInstance = await prisma.taskInstance.findUniqueOrThrow({
                where: {
                    id: taskInstanceId
                }
            })
            
            //Update the given subtaskInstance status to COMPLETED
            await this.updateSubtaskStatus(id, Status.COMPLETED)
            

            //initialise the next subtaskInstance with the status "IN_PROGRESS"

            //Ordered after asc
            const subtasks = await this.getSubtasksForASingleTask(taskInstance.taskId);

            for (const subtask of subtasks) {
                const subtaskInstance = await prisma.subtaskInstance.findFirstOrThrow({
                    where: {
                        AND: [
                            {
                                subtaskId: subtask.subtaskId
                            },
                            {
                                taskInstanceId: taskInstanceId
                            }
                        ]
                    },
                });
                
                if (subtaskInstance.status === Status.PENDING) {
                    await this.updateSubtaskStatus(subtaskInstance.id, Status.IN_PROGRESS);
                    //Exit the transaction and end it here if there is a subtask that has been updated to IN_PROGRESS
                    return;
                }
            }


            /*==== TASKINSTANCE  ====*/

            //If the loop above didn't iterate to true, then all subtaskInstances must be status=COMPLETED.
            //We update the taskInstance.status to COMPLETED
            await prisma.taskInstance.update({
                where: {
                    id: taskInstance.id
                },
                data: {
                    status: Status.COMPLETED
                }
            })

            //Get all taskInstances in the order
            const taskInstancesInOrder = await prisma.taskInstance.findMany({
                where: {
                    orderId: taskInstance.orderId
                }
            })

            //Guard. Loop through taskInstances. If there still exists a taskInstance with status != COMPLETED, then exit the transaction.
            for (const taskInstanceIndex of taskInstancesInOrder) {
                if (taskInstanceIndex.status !== Status.COMPLETED) {
                    //Exit the transaction
                    return;
                }
            }

            /*==== ORDER  ====*/

            //If you reach here, then all taskInstances are COMPLETED. We update the status on the order itself to COMPLETED
            await prisma.order.update({
                where: {
                    id: taskInstance.orderId,
                },
                data: {
                    status: Status.COMPLETED,
                },
            });
        })
    }

    public async getSingleSubtask(instanceId: number) {
        return prisma.subtaskInstance.findUniqueOrThrow({
            where: {
                id: instanceId
            }
        })
    }


    public async getSubtasksForASingleTask(taskId: number) {
        return prisma.taskSubtask.findMany({
            where: {
                taskId: taskId,
            },
            orderBy: {
                subtaskNumber: "asc",
            },
        });
    }
}
