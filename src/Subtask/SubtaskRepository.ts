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

    public async FinishSubtask(subtaskId: number, taskInstanceId: number) {

        const taskInstance = await prisma.taskInstance.findUniqueOrThrow({
            where: {
                id: taskInstanceId
            }
        })

        return prisma.$transaction(async (prisma) => {
            //Update the given subtaskInstance status to COMPLETED
            await prisma.subtaskInstance.updateMany({
                where: {
                    AND: [
                        {
                            subtaskId: subtaskId
                        },
                        {
                            taskInstanceId: taskInstanceId
                        }
                    ]
                },
                data: {
                    status: Status.COMPLETED
                }
            })

            //initialise the next subtaskInstance with the status "IN_PROGRESS"
            const subtasks = await this.getSubtasksForASingleTask(taskInstance.taskId);

            for (const subtask of subtasks) {
                const [subtaskInstance] = await prisma.subtaskInstance.findMany({
                    where: {
                        subtaskId: subtask.subtaskId
                    }
                })

                if (subtaskInstance.status === Status.PENDING) {
                    await this.updateSubtaskStatus(subtaskInstance.id, taskInstance.id, Status.IN_PROGRESS);
                    break;
                }
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
