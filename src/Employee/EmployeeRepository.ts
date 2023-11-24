import { Department, Employee, Role } from "@prisma/client";
import prisma from "../Database/PrismaClient.js";

export default class EmployeeRepository {
    constructor() {}

    public async getAllEmployees(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string | undefined, filterBy: any) {
        const whereClause = {
            ...(searchValue && {
                OR: [
                    { firstName: { contains: searchValue } },
                    { lastName: { contains: searchValue } },
                ],
            }),
            ...(filterBy && { department: filterBy }),
        };

        const employees: Employee[] = await prisma.employee.findMany({
            skip: offset,
            take: limit,
            orderBy: { [sortBy]: sortDir.toLowerCase() },
            where: whereClause,
        });

        const totalCount = await prisma.employee.count({ where: whereClause });

        return { data: employees, metaData: { limit, offset, totalCount } };
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

    public async isExistingEmployee(id: string) {
        return prisma.employee.findUnique({
            where: {
                id: id
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
                role,
            },
        });
    }
}