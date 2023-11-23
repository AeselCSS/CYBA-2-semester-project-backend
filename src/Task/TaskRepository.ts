import prisma from "../Database/PrismaClient.js";
import { Status, TaskInstance } from "@prisma/client";

export default class TaskRepository {
    constructor() {}

    public async updateTaskInstanceStatus(taskInstanceId: number, employeeId: string, newStatus: Status) {
        return prisma.taskInstance.update({
            where: {
                id: taskInstanceId
            },
            data: {
                status: newStatus,
                employeeId: employeeId
            },
        });
    }

    public async initiateTaskInstance(taskInstance: TaskInstance, employeeId: string) {

        return prisma.$transaction(async (prisma) => {
            //Update the taskInstance status to IN_PROGRESS
            await this.updateTaskInstanceStatus(taskInstance.id, employeeId, Status.IN_PROGRESS);

            //Get all subtasks associated with the taskInstance. Sort after subtaskNumber
            const subtasks = await prisma.taskSubtask.findMany({
                where: {
                    taskId: taskInstance.taskId,
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

    public async getSingleTaskInstance(taskInstanceId: number) {
        return prisma.taskInstance.findUniqueOrThrow({
            where: {
                id: taskInstanceId
            }
        })
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

    public async createComment(taskInstanceId: number, comment: string, employeeId: string) {
        return prisma.taskInstanceComment.create({
            data: {
                comment: comment,
                taskInstanceId: taskInstanceId,
                employeeId: employeeId
            }
        })
    }
}
