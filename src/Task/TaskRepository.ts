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

    public async initiateTaskInstance(taskInstance: TaskInstance, employeeId: string, order: {status: Status, id: number}) {

        return prisma.$transaction(async (prisma) => {
        
            if (order.status === Status.PENDING) {
                
                await prisma.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: Status.IN_PROGRESS
                }
            })
        }

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
        return prisma.task.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                taskSubtasks: {
                    select: {
                        subtask: {
                            select: {
                                time: true
                            }
                        }
                    }
                }
            }
        });
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

    public async getSingleTask(taskId: number) {
        return prisma.taskInstance.findUniqueOrThrow({
            where: {
                id: taskId
            },
            select: {
                id: true,
                status: true,
                taskId: true,
                employeeId: true,
                updatedAt: true,
                subtaskInstances: {
                    select: {
                        id: true,
                        status: true,
                        updatedAt: true,
                        subtask: {
                            select: {
                                name: true,
                                time: true,
                                description: true
                            }
                        }
                    }
                },
                taskInstanceComments: {
                    select: {
                        id: true,
                        comment: true,
                        createdAt: true,
                        employee: {
                            select: {
                                id: true,
                                role: true,
                                department: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        })
    }
}
