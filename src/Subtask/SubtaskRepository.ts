import prisma from "../Database/PrismaClient.js";
import { Status } from "@prisma/client";

export default class SubtaskRepository {
    constructor() {}

    public async updateSubtaskStatus(subtaskId: number, taskInstanceId: number, newStatus: Status) {
        return prisma.subtaskInstance.updateMany({
            where: {
                AND: [
                    {
                        taskInstanceId: taskInstanceId,
                    },
                    {
                        subtaskId: subtaskId,
                    },
                ],
            },
            data: {
                status: newStatus,
            },
        });
    }

    public async completeSubtask(subtaskId: number, taskInstanceId: number) {

        const taskInstance = await prisma.taskInstance.findUniqueOrThrow({
            where: {
                id: taskInstanceId
            }
        })

        return prisma.$transaction(async (prisma) => {
            console.log("ENTERING TRANSACTION");
            
            //Update the given subtaskInstance status to COMPLETED
            await this.updateSubtaskStatus(subtaskId, taskInstanceId, Status.COMPLETED)

            //initialise the next subtaskInstance with the status "IN_PROGRESS"
            const subtasks = await this.getSubtasksForASingleTask(taskInstance.taskId);
            console.log(subtasks);
            

            for (const subtask of subtasks) {
                const [subtaskInstance] = await prisma.subtaskInstance.findMany({
                    where: {
                        AND: [
                            {
                                subtaskId: subtask.subtaskId,
                            },
                            {
                                taskInstanceId: taskInstance.id
                            }
                        ],
                    },
                });
                console.log(subtaskInstance);
                

                if (subtaskInstance.status === Status.PENDING) {
                    await this.updateSubtaskStatus(subtaskInstance.id, taskInstance.id, Status.IN_PROGRESS);
                    //Exit the transaction and end it here if there is a subtask that has been updated to IN_PROGRESS
                    return;
                }
            }

            //If the loop above didnt iterate to true, then all subtaskInstances must be status=COMPLETED. 
            //We update the taskInstance.status to COMPLETED
            await prisma.taskInstance.updateMany({
                where: {
                    id: taskInstance.id
                },
                data: {
                    status: Status.COMPLETED
                }
            })
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
