import prisma from '../Database/PrismaClient.js';
import { Order, Status } from '@prisma/client';

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
}
