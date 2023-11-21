import { Department, Employee, Role } from "@prisma/client";
import prisma from "../Database/PrismaClient.js";

export default class EmployeeRepository implements IPagination<Employee> {
    constructor() {}

    public async getAllItemsPagination(limit: number, offset: number, sortBy: string, sortDir: string) {
        const result: ResultPagination<Employee> = {};

        result.data = await prisma.employee.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.employee.count(),
        };

        return result;
    }

    public async getAllItemsSearchPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string) {
        const result: ResultPagination<Employee> = {};

        result.data = await prisma.employee.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            where: {
                OR: [
                    {
                        firstName: {
                            contains: searchValue,
                        },
                    },
                    {
                        lastName: {
                            contains: searchValue,
                        },
                    },
                ],
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.employee.count({
                where: {
                    OR: [
                        {
                            firstName: {
                                contains: searchValue,
                            },
                        },
                        {
                            lastName: {
                                contains: searchValue,
                            },
                        },
                    ],
                },
            }),
        };

        return result;
    }

    public async getAllItemsFilterPagination(limit: number, offset: number, sortBy: string, sortDir: string, filterBy: Department) {
        const result: ResultPagination<Employee> = {};

        result.data = await prisma.employee.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            where: {
                department: filterBy,
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.employee.count({
                where: {
                    department: filterBy,
                },
            }),
        };

        return result;
    }

    public async getAllItemsAllPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string, filterBy: Department) {
        const result: ResultPagination<Employee> = {};

        result.data = await prisma.employee.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            where: {
                OR: [
                    {
                        firstName: {
                            contains: searchValue,
                        },
                    },
                    {
                        lastName: {
                            contains: searchValue,
                        },
                    },
                ],
                AND: [
                    {
                        department: filterBy,
                    },
                ],
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.employee.count({
                where: {
                    OR: [
                        {
                            firstName: {
                                contains: searchValue,
                            },
                        },
                        {
                            lastName: {
                                contains: searchValue,
                            },
                        },
                    ],
                    AND: [
                        {
                            department: filterBy,
                        },
                    ],
                },
            }),
        };

        return result;
    }

    public async getSingleEmployee(id: string) {
        return prisma.employee.findUniqueOrThrow({
            where: {
                id: id,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                department: true,
                taskInstances: {
                    select: {
                        id: true,
                        status: true,
                        order: {
                            select: {
                                id: true,
                                car: {
                                    select: {
                                        registrationNumber: true,
                                        customer: {
                                            select: {
                                                firstName: true,
                                                lastName: true,
                                                phone: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        task: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
    }

    public async createEmployee(id: string, firstName: string, lastName: string, department: Department, role: Role) {
        return prisma.employee.create({
            data: {
                id,
                firstName,
                lastName,
                department,
                role
            }
        })
    }
}


// return prisma.employee.findUniqueOrThrow({
//     where: {
//         id: id,
//     },
//     include: {
//         taskInstances: {
//             include: {
//                 subtaskInstances: true,
//             },
//         },
//     },
// });