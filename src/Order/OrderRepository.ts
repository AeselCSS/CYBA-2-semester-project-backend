import { Order, Status } from ".prisma/client";
import prisma from "../Database/PrismaClient.js";

export default class OrderRepository implements IPagination<Order> {
    constructor() {}

    public async getAllItemsPagination(limit: number, offset: number, sortBy: string, sortDir: string) {
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
                        registrationNumber: true
                    }
                }
            }
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.order.count(),
        };

        return result;
    }

    public async getAllItemsSearchPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string): Promise<ResultPagination<Order>> {
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

    public async getAllItemsSearchNumberPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: number) {
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

    public async getAllItemsFilterPagination(limit: number, offset: number, sortBy: string, sortDir: string, filterBy: Status) {
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

    public async getAllItemsAllPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string, filterBy: Status) {
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

    public async getAllItemsNumberAllPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: number, filterBy: Status) {
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
}
