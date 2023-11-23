import prisma from "../Database/PrismaClient.js";
import { Status } from "@prisma/client";

export default class TaskRepository {
    constructor() {}

    public async updateTaskInstanceStatus(taskId: number, orderId: number, newStatus: Status) {
        return prisma.taskInstance.updateMany({
            where: {
                AND: [
                    {
                        taskId: taskId,
                    },
                    {
                        orderId: orderId,
                    },
                ],
            },
            data: {
                status: newStatus,
            },
        });
    }

    public async initiateTaskInstance(taskId: number, orderId: number) {
        //Get the id of the taskInstance itself. Used for later.
        const [taskInstance] = await this.getSingleTaskInstance(taskId, orderId)

        return prisma.$transaction(async (prisma) => {
            //Update the taskInstance status to a newStatus
            await prisma.taskInstance.updateMany({
                where: {
                    AND: [
                        {
                            taskId: taskId,
                        },
                        {
                            orderId: orderId,
                        },
                    ],
                },
                data: {
                    status: Status.IN_PROGRESS,
                },
            });


            //Get all subtasks associated with the taskInstance. Sort after subtaskNumber
            const subtasks = await prisma.taskSubtask.findMany({
                where: {
                    taskId: taskId,
                },
                orderBy: {
                    subtaskNumber: "asc",
                },
            });

            //Update the first subtask in the taskInstance to a status "IN_PROGRESS"
            await prisma.subtaskInstance.updateMany({
                where: {
                    AND: [
                        {
                            taskInstanceId: taskInstance.id,
                        },
                        {
                            subtaskId: subtasks[0].subtaskId,
                        },
                    ],
                },
                data: {
                    status: Status.IN_PROGRESS,
                },
            });
        })
    }

    public async getSingleTaskInstance(taskId: number, orderId: number) {
        return prisma.taskInstance.findMany({
            where: {
                AND: [
                    {
                        taskId: taskId,
                    },
                    {
                        orderId: orderId,
                    },
                ],
            },
        });
    }

    public async getTasks() {
        return prisma.task.findMany();
    }

    public async getOrderIdByTaskInstanceId(taskInstanceId: number) {
        const taskInstance = await prisma.taskInstance.findFirstOrThrow({
            where: {
                id: taskInstanceId
            }
        })

        return taskInstance.orderId;
    }

    public async getTaskInstancesInSingleOrder(orderId: number) {

        return prisma.taskInstance.findMany({
            where: {
                orderId: orderId
            }
        })
    }
}
