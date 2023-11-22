import prisma from '../Database/PrismaClient.js';
import {Car} from '@prisma/client';

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
            totalCount: await prisma.car.count({
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
                }
            }),
        };

        return result;
    }

    public async getSingleCar(id: number) {
        return prisma.car.findUniqueOrThrow({
            where: {id},
            select: {
                id: true,
                registrationNumber: true,
                vinNumber: true,
                brand: true,
                model: true,
                modelVariant: true,
                mileage: true,
                firstRegistration: true,
                lastInspectionDate: true,
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    }
                }
            }

        });
    }

    public async createCar(newCar: NewCar): Promise<Car> {
        return prisma.car.create({
            data: newCar
        });
    }

    public async updateCar(id: number, mileage: number): Promise<Car> {
        return prisma.car.update({
            where: {id},
            data: {mileage}
        });
    }

    public async deleteCar(id: number) {

        //Guard
        await prisma.car.findUniqueOrThrow({
            where: {
                id: id
            }
        })

        return prisma.$transaction([
            // move all orders to car with id 1 (DELETED)
            prisma.order.updateMany({
                where: {carId: id},
                data: {carId: 1}
            }),
            // delete car with id
            prisma.car.delete({
                where: {id}
            })
        ]);
    }
}
