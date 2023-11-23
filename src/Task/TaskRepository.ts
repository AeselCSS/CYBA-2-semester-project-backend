import prisma from "../Database/PrismaClient.js";
import { Status } from "@prisma/client";

export default class TaskRepository {
    constructor() {}

    public async initiateTaskInstance(taskId: number, orderId: number) {
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
                status: Status.IN_PROGRESS,
            },
        });
    }

    public async completeTaskInstance(taskId: number, orderId: number) {
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
                status: Status.COMPLETED,
            },
        });
    }

    public async cancelTaskInstance(taskId: number, orderId: number) {
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
                status: Status.CANCELED,
            },
        });
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
}
