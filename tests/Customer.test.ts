// @ts-ignore
import prisma from "../src/Database/PrismaClient";
// @ts-ignore
import {app} from "../src/server";
import supertest from "supertest"
import {Role} from "@prisma/client";

describe("Costumer", () => {

    const customers = [
        {
            id: 'DELETED',
            role: Role.CUSTOMER,
            firstName: 'DELETED',
            lastName: 'DELETED',
            address: 'DELETED',
            city: 'DELETED',
            zip: 404,
            phone: 404,
            email: 'DELETED@DELETED.com',
        },
        {
            id: '90b6fd6b4b4343ffa05e8278',
            role: Role.CUSTOMER,
            firstName: 'Lars',
            lastName: 'Jensen',
            address: 'Kongensgade 47',
            city: 'Horsens',
            zip: 8319,
            phone: 67453310,
            email: 'lars.rasmussen@mailbox.dk',
        },
        {
            id: '7925557bb8c34013ba1b33d5',
            role: Role.CUSTOMER,
            firstName: 'Sofie',
            lastName: 'Jensen',
            address: 'Bredgade 99',
            city: 'Esbjerg',
            zip: 2667,
            phone: 13657974,
            email: 'sofie.jensen@post.dk',
        },
        {
            id: '8c081169f97e42479b136a6a',
            role: Role.CUSTOMER,
            firstName: 'Rasmus',
            lastName: 'Nielsen',
            address: 'Kongensgade 73',
            city: 'Odense',
            zip: 7018,
            phone: 75852676,
            email: 'rasmus.nielsen@post.dk',
        },
    ];

    const cars = [
        {
            registrationNumber: 'DELETED',
            model: 'DELETED',
            modelVariant: 'DELETED',
            firstRegistration: new Date(),
            mileage: 404,
            lastInspectionDate: new Date(),
            lastInspectionKind: 'DELETED',
            customerId: 'DELETED',
            brand: 'DELETED',
            lastInspectionResult: 'DELETED',
            vinNumber: 'DELETED',
        },
        {
            registrationNumber: 'PDI3QC',
            model: '3 Series',
            modelVariant: '2.0 TDI (150 HK) Sedan, 4 dørs Forhjulstræk Automatisk',
            firstRegistration: new Date('2023-02-19'),
            mileage: 69450,
            lastInspectionDate: new Date('2022-11-02'),
            lastInspectionKind: 'PeriodiskSyn',
            customerId: '90b6fd6b4b4343ffa05e8278',
            brand: 'Ford',
            lastInspectionResult: 'Godkendt',
            vinNumber: 'T7WUE8ZRVH9738U1P',
        },
        {
            registrationNumber: 'L7V9RZ',
            model: 'X5',
            modelVariant: '2.0 TDI (150 HK) Sedan, 4 dørs Forhjulstræk Automatisk',
            firstRegistration: new Date('2023-11-02'),
            mileage: 114669,
            lastInspectionDate: new Date('2022-08-06'),
            lastInspectionKind: 'PeriodiskSyn',
            customerId: '7925557bb8c34013ba1b33d5',
            brand: 'Tesla',
            lastInspectionResult: 'Ikke Godkendt',
            vinNumber: '48W08HEBPP73KAXRD',
        },
        {
            registrationNumber: 'NEWCAR1',
            model: 'Model X',
            modelVariant: '2.0 TDI (150 HK) SUV, 5 dørs All-wheel Drive Automatisk',
            firstRegistration: new Date('2023-03-15'),
            mileage: 55000,
            lastInspectionDate: new Date('2022-10-10'),
            lastInspectionKind: 'PeriodiskSyn',
            customerId: '8c081169f97e42479b136a6a',
            brand: 'Toyota',
            lastInspectionResult: 'Godkendt',
            vinNumber: 'ABC123XYZ456',
        },
        {
            registrationNumber: 'NEWCAR2',
            model: 'Civic',
            modelVariant: '1.5 i-VTEC (180 HK) Sedan, 4 dørs Front-wheel Drive Automatisk',
            firstRegistration: new Date('2023-05-20'),
            mileage: 30000,
            lastInspectionDate: new Date('2023-02-28'),
            lastInspectionKind: 'Omsyn',
            customerId: '8c081169f97e42479b136a6a',
            brand: 'Honda',
            lastInspectionResult: 'Ikke Godkendt',
            vinNumber: 'XYZ789ABC123',
        },
    ];



    beforeAll( async () => {

        const createCustomers = prisma.customer.createMany({
            data: customers
        })

        const createCars = prisma.car.createMany({
            data: cars
        })

        await prisma.$transaction([
            createCustomers,
            createCars
        ])
    })

    afterAll( async () => {
        const deleteCustomers = prisma.customer.deleteMany();
        const deleteCars = prisma.car.deleteMany();

        await prisma.$transaction([
            deleteCars,
            deleteCustomers
        ])

        await prisma.$disconnect();
    })

    describe("Get Many Customers", () => {

        it('should return 2 customers when searching for "Jensen"', async () => {

            const {body, statusCode} = await supertest(app).get("/customers?sortDir=asc&sortBy=firstName&pageNum=1&pageSize=10&searchValue=Jensen")

            expect(body).toEqual({
                data: expect.any(Array),
                metaData: {
                    limit: expect.any(Number),
                    offset: expect.any(Number),
                    totalCount: 2,
                }
            })
            expect(body.data.length).toBe(2);
            expect(statusCode).toBe(200);
            expect(body.data[0].firstName).toEqual("Lars")
            expect(body.data[0].lastName).toEqual("Jensen")
            expect(body.data[1].firstName).toEqual("Sofie")
            expect(body.data[1].lastName).toEqual("Jensen")
        });


        it('should return customers sorted with firstName desc (string)', async () => {

            const customersSorted = customers.sort((a,b) => b.firstName.localeCompare(a.firstName))

            const {body, statusCode} = await supertest(app).get("/customers?sortDir=desc&sortBy=firstName&pageNum=1&pageSize=10")

            expect(body).toEqual({
                data: expect.any(Array),
                metaData: {
                    limit: expect.any(Number),
                    offset: expect.any(Number),
                    totalCount: 4,
                }
            })
            expect(body.data.length).toBe(4);
            expect(statusCode).toBe(200);

            customersSorted.forEach((localCostumer, index) => {
                expect(body.data[index].id).toEqual(localCostumer.id)
            })
        });

        it('should return customers sorted with id desc (number)', async () => {

            const customersSorted = customers.sort((a,b) => b.id.localeCompare(a.id))

            const {body, statusCode} = await supertest(app).get("/customers?sortDir=desc&sortBy=id&pageNum=1&pageSize=10")

            expect(body).toEqual({
                data: expect.any(Array),
                metaData: {
                    limit: expect.any(Number),
                    offset: expect.any(Number),
                    totalCount: 4,
                }
            })
            expect(body.data.length).toBe(4);
            expect(statusCode).toBe(200);

            customersSorted.forEach((localCostumer, index) => {
                expect(body.data[index].id).toEqual(localCostumer.id)
            })
        });

        it('should return 0 costumers when there is no search match', async () => {
            const {body, statusCode} = await supertest(app).get("/customers?sortDir=asc&sortBy=firstName&pageNum=1&pageSize=10&searchValue=ALISALAMI")

            expect(body).toEqual({
                data: expect.any(Array),
                metaData: {
                    limit: expect.any(Number),
                    offset: expect.any(Number),
                    totalCount: 0,
                }
            })
            expect(body.data.length).toBe(0);
            expect(statusCode).toBe(200);
        });

        it('should return an error if sortDir query is missing', async () => {
            const {statusCode} = await supertest(app).get("/customers?sortBy=firstName&pageNum=1&pageSize=10")

            expect(statusCode).toBe(404);
        });

        it('should return an error if sortBy query is missing', async () => {
            const {statusCode} = await supertest(app).get("/customers?sortDir=desc&pageNum=1&pageSize=10")

            expect(statusCode).toBe(404);
        });


        it('should return an error if pageSize query is missing', async () => {
            const {statusCode} = await supertest(app).get("/customers?sortDir=desc&sortBy=firstName&pageNum=1")

            expect(statusCode).toBe(404);
        });

        it('should return an error if pageNum query is missing', async () => {
            const {statusCode} = await supertest(app).get("/customers?sortDir=desc&sortBy=firstName&pageSize=10")

            expect(statusCode).toBe(404);
        });
    })
})