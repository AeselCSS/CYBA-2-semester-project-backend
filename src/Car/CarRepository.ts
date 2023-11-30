import prisma from '../Database/PrismaClient.js';
import {Car} from '@prisma/client';

export default class CarRepository {
    constructor() {}

    public async getAllCars(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string | undefined) {
        const whereClause = {
            ...(searchValue && {
                OR: [
                    {registrationNumber: {contains: searchValue}},
                    {vinNumber: {contains: searchValue}},
                    {brand: {contains: searchValue}},
                    {model: {contains: searchValue}},
                ],
            }),
        };

        const cars: Car[] = await prisma.car.findMany({
            skip: offset,
            take: limit,
            orderBy: {[sortBy]: sortDir.toLowerCase()},
            where: whereClause,
            // include: {
            //     customer: {
            //         select: {
            //             firstName: true,
            //             lastName: true,
            //             email: true,
            //             phone: true,
            //         },
            //     },
            // },
        });

        const totalCount = await prisma.car.count({where: whereClause});

        return {data: cars, metaData: {limit, offset, totalCount}};
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
