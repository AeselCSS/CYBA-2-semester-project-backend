import prisma from "../Database/PrismaClient.js";
import { Status } from "@prisma/client";

export default class SubtaskRepository {
    constructor() {}

    public async updateSubtaskStatus(subtaskId: number, taskInstanceId: number, newStatus: Status) {
        return prisma.subtaskInstance.updateMany({
            where: {
                AND: [
                    {
                        taskInstanceId: taskInstanceId
                    },
                    {
                        subtaskId: subtaskId
                    }
                ]
            },
            data: {
                status: newStatus
            }
        });
    }

    

    public async getSubtasksForASingleTask(taskId: number) {
        return prisma.taskSubtask.findMany({
            where: {
                taskId: taskId
            }, 
            orderBy: {
                subtaskNumber: "asc"
            }
        })
    }
}
