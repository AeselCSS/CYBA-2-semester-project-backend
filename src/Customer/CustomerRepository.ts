import prisma from "../Database/PrismaClient.js";
import { Customer } from "@prisma/client";
import { Role } from "@prisma/client";

export default class CustomerRepository {

    constructor() {}

    public async getAllCustomers(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string | undefined) {
        const whereClause = {
            ...(searchValue && {
                OR: [
                    { firstName: { contains: searchValue } },
                    { lastName: { contains: searchValue } },
                    { email: { contains: searchValue } },
                ],
            }),
        };

        const customers: Customer[] = await prisma.customer.findMany({
            skip: offset,
            take: limit,
            orderBy: { [sortBy]: sortDir.toLowerCase() },
            where: whereClause,
        });

        const totalCount = await prisma.customer.count({ where: whereClause });

        return { data: customers, metaData: { limit, offset, totalCount } };
    }

    public async getSingleCustomer(id: string) {
        return prisma.customer.findUniqueOrThrow({
            where: {
                id: id,
            },
            include: {
                orders: true,
                cars: true
            }
        });
    }

    public async isExistingCustomer(id: string, email: string) {
        return prisma.customer.findFirst({
            where: {
                AND: [
                    {
                        id: id
                    },
                    {
                        email: email
                    }
                ]
            }
        })
    }

    public async updateCustomer(id: string, { firstName, lastName, address, city, email, phone, zip }: CustomerReqBody) {
        return prisma.customer.update({
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

            await prisma.order.updateMany({
                where: {
                    customerId: id,
                },
                data: {
                    customerId: "DELETED",
                    carId: 1
                },
            });

            await prisma.car.deleteMany({
                where: {
                    customerId: id,
                }
            })

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
