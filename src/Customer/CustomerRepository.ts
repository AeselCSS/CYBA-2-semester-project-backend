import prisma from "../PrismaClient.js";


export default class CustomerRepository {
    constructor() {}


    public async getCustomers(limit: number, offset: number, sortBy: string, sortDir: string) {
        const orderByValue = {
            [sortBy]: sortDir.toLowerCase()
        }

        return prisma.customer.findMany({
            skip: offset,
            take: limit,
            orderBy: orderByValue
        })
    }
}