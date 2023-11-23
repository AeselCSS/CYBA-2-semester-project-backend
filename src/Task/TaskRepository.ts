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
