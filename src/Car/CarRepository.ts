import prisma from '../Database/PrismaClient.js';
import { Car } from '@prisma/client';

export default class CarRepository implements IPagination<Car> {
    constructor() {}

    public async getAllItemsPagination(
        limit: number,
        offset: number,
        sortBy: string,
        sortDir: string
    ): Promise<ResultPagination<Car>> {
        const result: ResultPagination<Car> = {};

        result.data = await prisma.car.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: await prisma.car.count(),
        };

        return result;
    }

    public async getAllItemsSearchPagination(
        limit: number,
        offset: number,
        sortBy: string,
        sortDir: string,
        searchValue: string
    ): Promise<ResultPagination<Car>> {
        const result: ResultPagination<Car> = {};

        result.data = await prisma.car.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase(),
            },
            where: {
                OR: [
                    {
                        registrationNumber: {
                            contains: searchValue,
                        },
                    },
                    {
                        vinNumber: {
                            contains: searchValue,
                        },
                    },
                    {
                        model: {
                            contains: searchValue,
                        },
                    },
                ],
            },
        });

        result.metaData = {
            limit,
            offset,
            totalCount: result.data.length,
        };

        return result;
    }
}
