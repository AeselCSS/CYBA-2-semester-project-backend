import prisma from "../Database/PrismaClient.js";
import { Customer } from "@prisma/client";
import { Role } from "@prisma/client";


export default class CustomerRepository implements IPagination<Customer> {

    constructor() {}

    public async getAllItemsPagination(limit: number, offset: number, sortBy: string, sortDir: string): Promise<ResultPagination<Customer>> {
        const result: ResultPagination<Customer> = {};

        result.data = await prisma.customer.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.customer.count(),
        };

        return result;
    }

    public async getAllItemsSearchPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string): Promise<ResultPagination<Customer>> {
        const result: ResultPagination<Customer> = {};

        result.data = await prisma.customer.findMany({
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
                    {
                        address: {
                            contains: searchValue,
                        },
                    },
                ],
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.customer.count({
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
                        {
                            address: {
                                contains: searchValue,
                            },
                        },
                    ],
                },
            }),
        };

        return result;
    }

    public async getSingleCustomer(id: string) {
        return await prisma.customer.findUniqueOrThrow({
            where: {
                id: id,
            },
        });
    }

    public async updateCustomer(id: string, { firstName, lastName, address, city, email, phone, zip }: CustomerReqBody) {
        return await prisma.customer.update({
            where: {
                id: id,
            },
            data: {
                firstName,
                lastName,
                address,
                city,
                email,
                phone,
                zip,
                role: Role.CUSTOMER,
            },
        });
    }

    public async deleteCustomer(id: string) {
        //Guard. Throws if given an id that does not exist
        await prisma.customer.findFirstOrThrow({
            where: {
                id: id,
            },
        });

        await prisma.$transaction(async (prisma) => {
            await prisma.car.updateMany({
                where: {
                    customerId: id,
                },
                data: {
                    customerId: "DELETED",
                },
            });

            await prisma.order.updateMany({
                where: {
                    customerId: id,
                },
                data: {
                    customerId: "DELETED",
                },
            });

            await prisma.customer.delete({
                where: {
                    id: id,
                },
            });
        });
    }

    public async createCustomer({ firstName, lastName, address, city, email, phone, zip, id }: CustomerReqBody) {
        return await prisma.customer.create({
            data: {
                id,
                firstName,
                lastName,
                address,
                city,
                email,
                phone,
                zip,
                role: Role.CUSTOMER,
            },
        });
    }
}
