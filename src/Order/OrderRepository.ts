import prisma from '../Database/PrismaClient.js';
import {Order, Status, Task, TaskInstance} from '@prisma/client';

export default class OrderRepository implements IPagination<Order> {
    constructor() {}

    public async getAllItemsPagination(
        limit: number,
        offset: number,
        sortBy: string,
        sortDir: string
    ) {
        const result: ResultPagination<OrderResult> = {};

        result.data = await prisma.order.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            select: {
                id: true,
                customerId: true,
                status: true,
                orderStartDate: true,
                createdAt: true,
                updatedAt: true,
                car: {
                    select: {
                        registrationNumber: true,
                    },
                },
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.order.count(),
        };

        return result;
    }

    public async getAllItemsSearchPagination(
        limit: number,
        offset: number,
        sortBy: string,
        sortDir: string,
        searchValue: string
    ): Promise<ResultPagination<Order>> {
        const result: ResultPagination<OrderResult> = {};

        result.data = await prisma.order.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            where: {
                car: {
                    registrationNumber: {
                        contains: searchValue,
                    },
                },
            },
            select: {
                id: true,
                customerId: true,
                status: true,
                orderStartDate: true,
                createdAt: true,
                updatedAt: true,
                car: {
                    select: {
                        registrationNumber: true,
                    },
                },
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.order.count({
                where: {
                    car: {
                        registrationNumber: {
                            contains: searchValue,
                        },
                    },
                },
            }),
        };

        return result;
    }

    public async getAllItemsSearchNumberPagination(
        limit: number,
        offset: number,
        sortBy: string,
        sortDir: string,
        searchValue: number
    ) {
        const result: ResultPagination<OrderResult> = {};

        result.data = await prisma.order.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            where: {
                id: {
                    equals: searchValue,
                },
            },
            select: {
                id: true,
                customerId: true,
                status: true,
                orderStartDate: true,
                createdAt: true,
                updatedAt: true,
                car: {
                    select: {
                        registrationNumber: true,
                    },
                },
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.order.count({
                where: {
                    id: {
                        equals: searchValue,
                    },
                },
            }),
        };

        return result;
    }

    public async getAllItemsFilterPagination(
        limit: number,
        offset: number,
        sortBy: string,
        sortDir: string,
        filterBy: Status
    ) {
        const result: ResultPagination<OrderResult> = {};

        result.data = await prisma.order.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            where: {
                status: filterBy,
            },
            select: {
                id: true,
                customerId: true,
                status: true,
                orderStartDate: true,
                createdAt: true,
                updatedAt: true,
                car: {
                    select: {
                        registrationNumber: true,
                    },
                },
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.order.count({
                where: {
                    status: filterBy,
                },
            }),
        };

        return result;
    }

    public async getAllItemsAllPagination(
        limit: number,
        offset: number,
        sortBy: string,
        sortDir: string,
        searchValue: string,
        filterBy: Status
    ) {
        const result: ResultPagination<OrderResult> = {};

        result.data = await prisma.order.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            where: {
                car: {
                    registrationNumber: {
                        contains: searchValue,
                    },
                },
                AND: [
                    {
                        status: filterBy,
                    },
                ],
            },
            select: {
                id: true,
                customerId: true,
                status: true,
                orderStartDate: true,
                createdAt: true,
                updatedAt: true,
                car: {
                    select: {
                        registrationNumber: true,
                    },
                },
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.order.count({
                where: {
                    car: {
                        registrationNumber: {
                            contains: searchValue,
                        },
                    },
                    AND: [
                        {
                            status: filterBy,
                        },
                    ],
                },
            }),
        };

        return result;
    }

    public async getAllItemsNumberAllPagination(
        limit: number,
        offset: number,
        sortBy: string,
        sortDir: string,
        searchValue: number,
        filterBy: Status
    ) {
        const result: ResultPagination<OrderResult> = {};

        result.data = await prisma.order.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            where: {
                id: {
                    equals: searchValue,
                },
                AND: [
                    {
                        status: filterBy,
                    },
                ],
            },
            select: {
                id: true,
                customerId: true,
                status: true,
                orderStartDate: true,
                createdAt: true,
                updatedAt: true,
                car: {
                    select: {
                        registrationNumber: true,
                    },
                },
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.order.count({
                where: {
                    id: {
                        equals: searchValue,
                    },
                    AND: [
                        {
                            status: filterBy,
                        },
                    ],
                },
            }),
        };

        return result;
    }

    public async getSingleOrder(id: number) {
        return prisma.order.findUniqueOrThrow({
            where: {
                id: id,
            },
            select: {
                id: true,
                status: true,
                orderStartDate: true,
                createdAt: true,
                updatedAt: true,
                car: {
                    select: {
                        id: true,
                        registrationNumber: true,
                        vinNumber: true,
                        brand: true,
                        model: true,
                        modelVariant: true,
                        mileage: true,
                    },
                },
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
                taskInstances: {
                    select: {
                        id: true,
                        status: true,
                        updatedAt: true,
                        employee: {
                            select: {
                                firstName: true,
                                lastName: true,
                                department: true,
                            },
                        },
                        task: {
                            select: {
                                name: true,
                                description: true,
                            },
                        },
                        subtaskInstances: {
                            select: {
                                id: true,
                                status: true,
                                updatedAt: true,
                                subtask: {
                                    select: {
                                        name: true,
                                        time: true,
                                        description: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    public async getOrderStatus(id: number) {
        return prisma.order.findUniqueOrThrow({
            where: {
                id: id,
            },
            select: {
                status: true,
            },
        });
    }

    public async updateOrderStatus(id: number, status: Status) {
        return prisma.order.update({
            where: {
                id: id,
            },
            data: {
                status: status,
            },
        });
    }

    public async getOrderTasks(id: number) {
        return prisma.order.findUniqueOrThrow({
            where: {
                id: id,
            },
            include: {
                taskInstances: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    }

    public async getTaskSubtasks(tasks: Task[]) {
        return prisma.taskSubtask.findMany({
            where: {
                taskId: {
                    in: tasks.map((task) => task.id),
                },
            },
        });
    }

    public async updateOrderTasks(
        orderId: number,
        tasksToDelete: { id: number }[],
        tasksToAdd: Task[],
        subtasksToAdd: {
            taskId: number;
            subtaskId: number;
            subtaskNumber: number;
        }[]
    ) {
        return prisma.$transaction(async (prisma) => {
            // Delete task and subtask instances if there are tasks to delete
            if (tasksToDelete.length > 0) {
                await prisma.subtaskInstance.deleteMany({
                    where: {
                        taskInstanceId: {
                            in: tasksToDelete.map((task) => task.id),
                        },
                    },
                });

                await prisma.taskInstance.deleteMany({
                    where: {
                        id: {
                            in: tasksToDelete.map((task) => task.id),
                        },
                    },
                });
            }

            // Variables to store new task instances and subtask instance data
            let newTaskInstances: TaskInstance[] = [];
            let subtaskInstanceData: /*{status: Status, subtaskId: number, taskInstanceId: number}*/ any[] =
                [];

            // Create new task instances if there are tasks to add
            if (tasksToAdd.length > 0) {
                await prisma.taskInstance.createMany({
                    data: tasksToAdd.map((task) => ({
                        status: 'PENDING',
                        taskId: task.id,
                        orderId: orderId,
                    })),
                });

                // Fetch the newly created task instances to get their IDs
                newTaskInstances = await prisma.taskInstance.findMany({
                    where: {
                        orderId: orderId,
                        taskId: {
                            in: tasksToAdd.map((task) => task.id),
                        },
                    },
                });

                // Map each subtask to its corresponding task instance
                subtaskInstanceData = subtasksToAdd
                    .map((subtask) => {
                        const taskInstance = newTaskInstances.find(
                            (instance) => instance.taskId === subtask.taskId
                        );
                        return taskInstance
                            ? {
                                status: 'PENDING',
                                subtaskId: subtask.subtaskId,
                                taskInstanceId: taskInstance.id,
                            }
                            : null;
                    })
                    .filter((item) => item !== null);
            }

            // Create new subtask instances if there are subtasks to add
            if (subtaskInstanceData.length > 0) {
                await prisma.subtaskInstance.createMany({
                    data: subtaskInstanceData,
                });
            }
        });
    }

    public async createOrder(
        order: NewOrder,
        subtasks: {
            taskId: number;
            subtaskId: number;
            subtaskNumber: number;
        }[]
    ) {
        return prisma.$transaction(async (prisma) => {
            // Create order
            const newOrder = await prisma.order.create({
                data: {
                    customerId: order.customerId,
                    carId: order.carId,
                    status: Status.AWAITING_CUSTOMER,
                    orderStartDate: order.orderStartDate,
                },
            });

            // Variables to store new task instances and subtask instance data
            let newTaskInstances: TaskInstance[] = [];
            let subtaskInstanceData: /*{status: Status, subtaskId: number, taskInstanceId: number}*/ any[] =
                [];

            // Create task instances
            await prisma.taskInstance.createMany({
                data: order.tasks.map((task) => ({
                    status: Status.PENDING,
                    taskId: task.id,
                    orderId: newOrder.id,
                })),
            });

            // Fetch the newly created task instances to get their IDs
            newTaskInstances = await prisma.taskInstance.findMany({
                where: {
                    orderId: newOrder.id,
                    taskId: {
                        in: order.tasks.map((task) => task.id),
                    },
                },
            });

            // Create subtask instances
            subtaskInstanceData = subtasks
                .map((subtask) => {
                    const taskInstance = newTaskInstances.find(
                        (instance: any) => instance.taskId === subtask.taskId
                    );
                    return taskInstance
                        ? {
                            status: Status.PENDING,
                            subtaskId: subtask.subtaskId,
                            taskInstanceId: taskInstance.id,
                        }
                        : null;
                })
                .filter((item) => item !== null);

            await prisma.subtaskInstance.createMany({
                data: subtaskInstanceData,
            });
        });
    }
}