import {Employee} from "@prisma/client";
import prisma from "../Database/PrismaClient.js";

export default class EmployeeRepository implements IPagination<Employee>{

    constructor() {}

    public async getAllItemsPagination(limit: number, offset: number, sortBy: string, sortDir: string) {
        return prisma.employee.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase()
            }
        })
    }

    public async getAllItemsSearchPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string) {
        return prisma.employee.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase()
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
                    }
                ]
            }
        })
    }

    public async getAllItemsFilterPagination(limit: number, offset: number, sortBy: string, sortDir: string, filterBy: string) {
        return prisma.employee.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase()
            }
        })
    }

    public async getAllItemsAllPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string, filterBy: string) {
        return prisma.employee.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase()
            }
        })
    }
}