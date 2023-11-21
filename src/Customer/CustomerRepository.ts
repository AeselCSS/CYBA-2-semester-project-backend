import prisma from "../Database/PrismaClient.js";
import {Customer} from "@prisma/client";



export default class CustomerRepository implements IPagination<Customer>{
    constructor() {}

    public async getAllItemsPagination(limit: number, offset: number, sortBy: string, sortDir: string): Promise<ResultPagination<Customer>> {

        const result: ResultPagination<Customer>  = {}

        result.data = await prisma.customer.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase()
            }
        })

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.customer.count()
        }

        return result;
    }

    public async getAllItemsSearchPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string): Promise<ResultPagination<Customer>> {

        const result: ResultPagination<Customer>  = {}

        result.data = await prisma.customer.findMany({
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
                    },
                    {
                        address: {
                            contains: searchValue
                        }
                    }
                ]
            }
        })

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.customer.count()
        }

        return result;
    }
}