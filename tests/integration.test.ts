// @ts-ignore
import prisma from "../src/Database/PrismaClient";
// @ts-ignore
import {app} from "../src/server";
import supertest from "supertest";
import {Car, Customer, Department, Employee, Order, Role, Status} from "@prisma/client";


describe("INTEGRATION TESTS", () => {


    const customers = [
        {
            id: "DELETED",
            role: Role.CUSTOMER,
            firstName: "DELETED",
            lastName: "DELETED",
            address: "DELETED",
            city: "DELETED",
            zip: 404,
            phone: 404,
            email: "DELETED@DELETED.com",
        },
        {
            id: "90b6fd6b4b4343ffa05e8278",
            role: Role.CUSTOMER,
            firstName: "Lars",
            lastName: "Jensen",
            address: "Kongensgade 47",
            city: "Horsens",
            zip: 8319,
            phone: 67453310,
            email: "lars.rasmussen@mailbox.dk",
        },
        {
            id: "7925557bb8c34013ba1b33d5",
            role: Role.CUSTOMER,
            firstName: "Sofie",
            lastName: "Jensen",
            address: "Bredgade 99",
            city: "Esbjerg",
            zip: 2667,
            phone: 13657974,
            email: "sofie.jensen@post.dk",
        },
        {
            id: "8c081169f97e42479b136a6a",
            role: Role.CUSTOMER,
            firstName: "Rasmus",
            lastName: "Nielsen",
            address: "Kongensgade 73",
            city: "Odense",
            zip: 7018,
            phone: 75852676,
            email: "rasmus.nielsen@post.dk",
        },
        {
            id: "8c0811692345675647774136a6a",
            role: Role.CUSTOMER,
            firstName: "Niels",
            lastName: "Jeppesen",
            address: "Kongensgade 77",
            city: "Odense",
            zip: 7018,
            phone: 23453234,
            email: "niels.jeppesen@post.dk",
        },
    ];

    const cars = [
        {
            registrationNumber: "DELETED",
            model: "DELETED",
            modelVariant: "DELETED",
            firstRegistration: new Date(),
            mileage: 404,
            lastInspectionDate: new Date(),
            lastInspectionKind: "DELETED",
            customerId: "DELETED",
            brand: "DELETED",
            lastInspectionResult: "DELETED",
            vinNumber: "DELETED",
        },
        {
            registrationNumber: "PDI3QC",
            model: "3 Series",
            modelVariant: "2.0 TDI (150 HK) Sedan, 4 dørs Forhjulstræk Automatisk",
            firstRegistration: new Date("2023-02-19"),
            mileage: 69450,
            lastInspectionDate: new Date("2022-11-02"),
            lastInspectionKind: "PeriodiskSyn",
            customerId: "90b6fd6b4b4343ffa05e8278",
            brand: "Tesla",
            lastInspectionResult: "Godkendt",
            vinNumber: "T7WUE8ZRVH9738U1P",
        },
        {
            registrationNumber: "L7V9RZ",
            model: "X5",
            modelVariant: "2.0 TDI (150 HK) Sedan, 4 dørs Forhjulstræk Automatisk",
            firstRegistration: new Date("2023-11-02"),
            mileage: 114669,
            lastInspectionDate: new Date("2022-08-06"),
            lastInspectionKind: "PeriodiskSyn",
            customerId: "7925557bb8c34013ba1b33d5",
            brand: "Tesla",
            lastInspectionResult: "Ikke Godkendt",
            vinNumber: "48W08HEBPP73KAXRD",
        },
        {
            registrationNumber: "NEWCAR1",
            model: "Model X",
            modelVariant: "2.0 TDI (150 HK) SUV, 5 dørs All-wheel Drive Automatisk",
            firstRegistration: new Date("2023-03-15"),
            mileage: 55000,
            lastInspectionDate: new Date("2022-10-10"),
            lastInspectionKind: "PeriodiskSyn",
            customerId: "8c081169f97e42479b136a6a",
            brand: "Toyota",
            lastInspectionResult: "Godkendt",
            vinNumber: "ABC123XYZ456",
        },
        {
            registrationNumber: "NEWCAR2",
            model: "Civic",
            modelVariant: "1.5 i-VTEC (180 HK) Sedan, 4 dørs Front-wheel Drive Automatisk",
            firstRegistration: new Date("2023-05-20"),
            mileage: 30000,
            lastInspectionDate: new Date("2023-02-28"),
            lastInspectionKind: "Omsyn",
            customerId: "8c081169f97e42479b136a6a",
            brand: "Honda",
            lastInspectionResult: "Ikke Godkendt",
            vinNumber: "XYZ789ABC123",
        },
    ];

    const employees = [
        {
            id: "1",
            role: "EMPLOYEE" as Role,
            department: "PAINT_SHOP" as Department,
            firstName: "Christian",
            lastName: "Olesen"
        },
        {
            id: "2",
            role: "EMPLOYEE" as Role,
            department: "ADMINISTRATION" as Department,
            firstName: "Emma",
            lastName: "Brown"
        },
        {
            id: "3",
            role: "ADMIN" as Role,
            department: "PAINT_SHOP" as Department,
            firstName: "Daniel",
            lastName: "Brown"
        }
    ]

    const orders = [
        {
            status: "AWAITING_CUSTOMER" as Status,
            orderStartDate: new Date(),

        }
    ]

    console.log(orders)


    beforeAll(async () => {
        const createCustomers = prisma.customer.createMany({
            data: customers,
        });

        const createCars = prisma.car.createMany({
            data: cars,
        });

        const createEmployees = prisma.employee.createMany({
            data: employees
        })

        await prisma.$transaction([createCustomers, createCars, createEmployees]);
    });

    afterAll(async () => {
        const deleteCustomers = prisma.customer.deleteMany();
        const deleteCars = prisma.car.deleteMany();
        const deleteOrders = prisma.order.deleteMany();
        const deleteEmployees = prisma.employee.deleteMany();

        await prisma.$transaction([deleteOrders, deleteCars, deleteCustomers, deleteEmployees]);


        await prisma.$disconnect();
    });



    /*
     ===========================================================================================================================================
     ===========================================================================================================================================
     CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS CUSTOMERS
     ===========================================================================================================================================
     ===========================================================================================================================================
     */

    describe("Costumer", () => {

        describe("Get Many Customers", () => {
            it('should return 2 customers when searching for "Jensen"', async () => {
                const {body, statusCode} = await supertest(app).get("/customers?sortDir=asc&sortBy=firstName&pageNum=1&pageSize=10&searchValue=Jensen");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 2,
                    },
                });
                expect(body.data.length).toBe(2);
                expect(statusCode).toBe(200);
                expect(body.data[0].firstName).toEqual("Lars");
                expect(body.data[0].lastName).toEqual("Jensen");
                expect(body.data[1].firstName).toEqual("Sofie");
                expect(body.data[1].lastName).toEqual("Jensen");
            });

            it("should return customers sorted with firstName desc", async () => {
                const customersSorted = customers.sort((a, b) => b.firstName.localeCompare(a.firstName));

                const {body, statusCode} = await supertest(app).get("/customers?sortDir=desc&sortBy=firstName&pageNum=1&pageSize=10");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 5,
                    },
                });
                expect(body.data.length).toBe(5);
                expect(statusCode).toBe(200);

                customersSorted.forEach((localCostumer, index) => {
                    expect(body.data[index].id).toEqual(localCostumer.id);
                });
            });

            it("should return customers sorted with id desc", async () => {
                const customersSorted = customers.sort((a, b) => b.id.localeCompare(a.id));

                const {body, statusCode} = await supertest(app).get("/customers?sortDir=desc&sortBy=id&pageNum=1&pageSize=10");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 5,
                    },
                });
                expect(body.data.length).toBe(5);
                expect(statusCode).toBe(200);

                customersSorted.forEach((localCostumer, index) => {
                    expect(body.data[index].id).toEqual(localCostumer.id);
                });
            });

            it("should return 0 customers when there is no search match", async () => {
                const {body, statusCode} = await supertest(app).get("/customers?sortDir=asc&sortBy=firstName&pageNum=1&pageSize=10&searchValue=ALISALAMI");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 0,
                    },
                });
                expect(body.data.length).toBe(0);
                expect(statusCode).toBe(200);
            });

            it("should return an error if sortDir query is missing", async () => {
                const {statusCode} = await supertest(app).get("/customers?sortBy=firstName&pageNum=1&pageSize=10");

                expect(statusCode).toBe(400);
            });

            it("should return an error if sortBy query is missing", async () => {
                const {statusCode} = await supertest(app).get("/customers?sortDir=desc&pageNum=1&pageSize=10");

                expect(statusCode).toBe(400);
            });

            it("should return an error if pageSize query is missing", async () => {
                const {statusCode} = await supertest(app).get("/customers?sortDir=desc&sortBy=firstName&pageNum=1");

                expect(statusCode).toBe(400);
            });

            it("should return an error if pageNum query is missing", async () => {
                const {statusCode} = await supertest(app).get("/customers?sortDir=desc&sortBy=firstName&pageSize=10");

                expect(statusCode).toBe(400);
            });
        });

        describe("Get single customer", () => {
            it("should return the correct customer when specifying correct id", async () => {
                const {body, statusCode} = await supertest(app).get("/customers/8c081169f97e42479b136a6a");

                expect(body.customer.id).toBe("8c081169f97e42479b136a6a");
                expect(body.customer.email).toBe("rasmus.nielsen@post.dk")
                expect(statusCode).toBe(200);
            });

            it("should return an error when a customer could not be found by the specified id", async () => {
                const {statusCode} = await supertest(app).get("/customers/123ABC");

                expect(statusCode).toBe(404);
            });
        });

        describe("Create a new customer", () => {
            const payload = {
                id: "ASDFGHJQWERTY",
                firstName: "Bob",
                lastName: "Ole",
                address: "Gammelgade 12",
                city: "Copenhagen",
                zip: 2200,
                phone: 12345432,
                email: "bob.ole@mailbox.dk",
            };

            const payloadTwo = {
                id: "12345321ASD",
                firstName: "Ib",
                lastName: "Sørensen",
                address: "Unggade 12",
                city: "Copenhagen",
                zip: 2200,
                phone: 34565432,
                email: "ib.sørensen@mailbox.dk",
            };

            it("should successfully create a new customer", async () => {
                const {body, statusCode} = await supertest(app).post("/customers").send(payload).set("Content-Type", "application/json");

                expect(statusCode).toBe(201);
                expect(body.id).toEqual(payload.id);
                expect(body.email).toEqual("bob.ole@mailbox.dk");
                expect(body).toHaveProperty("createdAt")
            });

            it("should fail to create a new customer if zip is of type string", async () => {
                const failedPayload = {
                    ...payload,
                    zip: "2200",
                };

                const {statusCode} = await supertest(app).post("/customers").send(failedPayload).set("Content-Type", "application/json");

                expect(statusCode).toBe(400);
            });

            it("should fail to create a customer if customer already exists", async () => {
                await prisma.customer.create({
                    data: {
                        ...payloadTwo,
                        role: Role.CUSTOMER,
                    },
                });

                const {statusCode} = await supertest(app).post("/customers").send(payloadTwo).set("Content-Type", "application/json");

                expect(statusCode).toBe(400);
            });
        });

        describe("Update customer", () => {
            //ID: 8c0811692345675647774136a6a
            const payload = {
                firstName: "Brian",
                lastName: "Mikkelsen",
                address: "Kongensgade 77",
                city: "Odense",
                zip: 7018,
                phone: 23453234,
                email: "brain.mikkelsen@post.dk",
            };

            it("Should update the customer successfully", async () => {
                const {body, statusCode} = await supertest(app).put("/customers/8c0811692345675647774136a6a").send(payload).set("Content-Type", "application/json");

                expect(body.firstName).toBe('Brian')
                expect(body.lastName).toBe('Mikkelsen')
                expect(body.email).toBe('brain.mikkelsen@post.dk')
                expect(statusCode).toBe(200)
            });

            it("should fail to update a customer which does not exist", async () => {
                const {statusCode} = await supertest(app).put("/customers/hulabula").send(payload).set("Content-Type", "application/json");

                expect(statusCode).toBe(404)
            });

            it("should fail to update a customer if a property is missing", async () => {
                const {statusCode} = await supertest(app).put("/customers/8c0811692345675647774136a6a")
                    .send({
                        firstName: "Lars",
                        lastName: "Jeppesen"
                    })
                    .set("Content-Type", "application/json");


                expect(statusCode).toBe(400)
            });
        });

        describe("Delete customer", () => {
            it.skip('should delete the customer successfully and replace all their relations with "order" and "car" with id=DELETED', async () => {
                const car: Car = await prisma.car.findFirstOrThrow({
                    where: {
                        vinNumber: "XYZ789ABC123",
                    },
                });

                //Create new order
                const order: Order = await prisma.order.create({
                    data: {
                        status: Status.AWAITING_CUSTOMER,
                        orderStartDate: new Date(),
                        carId: car.id,
                        customerId: "8c081169f97e42479b136a6a",
                    },
                });

                const {statusCode} = await supertest(app).delete("/customers/8c081169f97e42479b136a6a");

                const carAfterDeletion: Car | null = await prisma.car.findUnique({
                    where: {
                        id: car.id,
                    },
                });

                const orderAfterDeletion: Order = await prisma.order.findFirstOrThrow({
                    where: {
                        id: order.id,
                    },
                });

                const deletedCustomer: Customer | null = await prisma.customer.findUnique({
                    where: {
                        id: "8c081169f97e42479b136a6a",
                    },
                });

                expect(orderAfterDeletion.customerId).toEqual("DELETED");
                expect(carAfterDeletion).toBeFalsy();
                expect(deletedCustomer).toBeFalsy();
                expect(statusCode).toBe(204);
            });

            it("should fail to delete a customer which does not exist", async () => {
                const {statusCode} = await supertest(app).delete("/customers/999999999999asb");

                expect(statusCode).toBe(404);
            });
        });
    });


    /*
     ===========================================================================================================================================
     ===========================================================================================================================================
     CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS CARS
     ===========================================================================================================================================
     ===========================================================================================================================================
     */

    describe("Car", () => {

        describe("Get many cars", () => {

            it('should return all cars', async () => {
                const {body, statusCode} = await supertest(app).get("/cars?sortDir=asc&sortBy=model&pageNum=1&pageSize=10")

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 5,
                    },
                });
                expect(body.data.length).toBe(5);
                expect(statusCode).toBe(200);
            });


            it("should return 2 cars when searching for 'Tesla'", async () => {
                const {body, statusCode} = await supertest(app).get("/cars?sortDir=asc&sortBy=model&pageNum=1&pageSize=10&searchValue=Tesla")

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 2,
                    },
                });
                expect(body.data.length).toBe(2);
                expect(statusCode).toBe(200);
            })

            it("should return 0 cars when there is no search match", async () => {
                const {body, statusCode} = await supertest(app).get("/cars?sortDir=asc&sortBy=model&pageNum=1&pageSize=10&searchValue=Mazda")

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 0,
                    },
                });
                expect(body.data.length).toBe(0);
                expect(statusCode).toBe(200);
            })

            it("should return cars sorted with mileage asc", async () => {
                const carsSorted = (cars as Car[]).sort((a,b) => a.mileage - b.mileage)

                const {body, statusCode} = await supertest(app).get("/cars?sortDir=asc&sortBy=mileage&pageNum=1&pageSize=10")

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 5,
                    },
                });
                expect(body.data.length).toBe(5);
                expect(statusCode).toBe(200);
                carsSorted.forEach((localCar, index) => {
                    expect(body.data[index].mileage).toEqual(localCar.mileage);
                });
            })

            it("should return cars sorted with brand desc", async () => {
                const carsSorted = (cars as Car[]).sort((a,b) => b.brand.localeCompare(a.brand))

                const {body, statusCode} = await supertest(app).get("/cars?sortDir=desc&sortBy=brand&pageNum=1&pageSize=10")

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 5,
                    },
                });
                expect(body.data.length).toBe(5);
                expect(statusCode).toBe(200);
                carsSorted.forEach((localCar, index) => {
                    expect(body.data[index].brand).toEqual(localCar.brand);
                });
            })


            it("should return an error if sortDir query is missing", async () => {
                const {statusCode} = await supertest(app).get("/cars?sortBy=firstName&pageNum=1&pageSize=10");

                expect(statusCode).toBe(400);
            });

            it("should return an error if sortBy query is missing", async () => {
                const {statusCode} = await supertest(app).get("/cars?sortDir=desc&pageNum=1&pageSize=10");

                expect(statusCode).toBe(400);
            });

            it("should return an error if pageSize query is missing", async () => {
                const {statusCode} = await supertest(app).get("/cars?sortDir=desc&sortBy=firstName&pageNum=1");

                expect(statusCode).toBe(400);
            });

            it("should return an error if pageNum query is missing", async () => {
                const {statusCode} = await supertest(app).get("/cars?sortDir=desc&sortBy=firstName&pageSize=10");

                expect(statusCode).toBe(400);
            });

        })


        describe("Get single car", () => {

            it("should return the correct car when specifying correct id", async () => {
                const newCar = {
                        registrationNumber: "NEWCAR9",
                        model: "Civic",
                        modelVariant: "1.5 i-VTEC (180 HK) Sedan, 4 dørs Front-wheel Drive Automatisk",
                        firstRegistration: new Date("2023-05-20"),
                        mileage: 30000,
                        lastInspectionDate: new Date("2023-02-28"),
                        lastInspectionKind: "Omsyn",
                        customerId: "8c081169f97e42479b136a6a",
                        brand: "Honda",
                        lastInspectionResult: "Ikke Godkendt",
                        vinNumber: "XYZ789CBA1233",
                }

                const createdCar: Car = await prisma.car.create({
                    data: newCar
                })

                const {body, statusCode} = await supertest(app).get(`/cars/${createdCar.id}`);

                expect(body.car.id).toBe(createdCar.id);
                expect(body.car.registrationNumber).toBe("NEWCAR9")
                expect(statusCode).toBe(200);
            })

            it("should return an error when a car could not be found by the specified id", async () => {
                const {body, statusCode} = await supertest(app).get(`/cars/999999999999999999`);

                expect(body).toEqual({"error": "No Car found"})
                expect(statusCode).toBe(404);
            })
        })

        describe("Create a new car", () => {

            it("should successfully create a new car", async () => {
                const payloadCar: Record<string, string | Date | number> = {
                    registrationNumber: "NEWCAR10",
                    model: "Civic",
                    modelVariant: "1.5 i-VTEC (180 HK) Sedan, 4 dørs Front-wheel Drive Automatisk",
                    firstRegistration: new Date("2023-05-20"),
                    mileage: 30000,
                    lastInspectionDate: new Date("2023-02-28"),
                    lastInspectionKind: "Omsyn",
                    customerId: "8c081169f97e42479b136a6a",
                    brand: "Honda",
                    lastInspectionResult: "Ikke Godkendt",
                    vinNumber: "XYZ789CBA123333",
                }

                const {body, statusCode} = await supertest(app).post(`/cars`).send(payloadCar).set("Content-Type", "application/json");

                for (const [key] of Object.keys(payloadCar)) {
                    expect(body[key]).toEqual(payloadCar[key]);
                }
                expect(statusCode).toBe(201);
            })

            it("should fail to create a new car if mileage is of type string", async () => {
                const payloadCarTwo: Record<string, string | Date | number> = {
                    registrationNumber: "NEWCAR11",
                    model: "Civic",
                    modelVariant: "1.5 i-VTEC (180 HK) Sedan, 4 dørs Front-wheel Drive Automatisk",
                    firstRegistration: new Date("2023-05-20"),
                    mileage: "30000",
                    lastInspectionDate: new Date("2023-02-28"),
                    lastInspectionKind: "Omsyn",
                    customerId: "8c081169f97e42479b136a6a",
                    brand: "Honda",
                    lastInspectionResult: "Ikke Godkendt",
                    vinNumber: "XYZ789CBA1231333",
                }

                const {statusCode} = await supertest(app).post(`/cars`).send(payloadCarTwo).set("Content-Type", "application/json");

                expect(statusCode).toBe(400);
            })

            it.skip("should fail to create a new car if a car with same registration nr. and vin number exists already", async () => {
                const payloadThree = cars[1];

                const {statusCode} = await supertest(app).post(`/cars`).send(payloadThree).set("Content-Type", "application/json");

                expect(statusCode).toBe(400);
            })
        })


        describe("Update car", () => {

            it("should update the customer successfully", async () => {

            })

            it("should fail to update a customer which does not exist", async () => {

            })

            it("should fail to update a customer if a property is missing", async () => {

            })
        })

        describe("Delete car", () => {

            it("should fail to delete a car which does not exist", async () => {

            })

            it("should delete the car successfully and replace all their relations with 'order' with carId=1", () => {

            })
        })
    })


    /*
     ===========================================================================================================================================
     ===========================================================================================================================================
     EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES EMPLOYEES
     ===========================================================================================================================================
     ===========================================================================================================================================
     */


    describe("Employees", () => {

        describe("Get many employees", () => {

            it("should return 2 employees when searching for 'Brown'", async () => {
                const {body, statusCode} = await supertest(app).get("/employees?sortDir=asc&sortBy=firstName&pageNum=1&pageSize=10&searchValue=Brown");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 2,
                    },
                });
                expect(body.data.length).toBe(2);
                expect(statusCode).toBe(200);
                expect(body.data[0].firstName).toEqual("Daniel");
                expect(body.data[0].lastName).toEqual("Brown");
                expect(body.data[1].firstName).toEqual("Emma");
                expect(body.data[1].lastName).toEqual("Brown");
            })

            it("should return employees sorted with firstName asc", async () => {
                const sortedEmployees = employees.sort((a,b) => a.firstName.localeCompare(b.firstName))

                const {body, statusCode} = await supertest(app).get("/employees?sortDir=asc&sortBy=firstName&pageNum=1&pageSize=10");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 3,
                    },
                });
                expect(body.data.length).toBe(3);
                expect(statusCode).toBe(200);

                sortedEmployees.forEach((localEmployee, index) => {
                    expect(body.data[index].firstName).toEqual(localEmployee.firstName);
                });
            })

            it("should return employees sorted with lastName desc", async () => {
                const sortedEmployees = employees.sort((a,b) => b.lastName.localeCompare(a.lastName))

                const {body, statusCode} = await supertest(app).get("/employees?sortDir=desc&sortBy=lastName&pageNum=1&pageSize=10");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 3,
                    },
                });
                expect(body.data.length).toBe(3);
                expect(statusCode).toBe(200);

                sortedEmployees.forEach((localEmployee, index) => {
                    expect(body.data[index].lastName).toEqual(localEmployee.lastName);
                });
            })

            it("should return 0 employees when there is no search match", async () => {
                const {body, statusCode} = await supertest(app).get("/employees?sortDir=desc&sortBy=firstName&pageNum=1&pageSize=10&searchValue=blabla");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 0,
                    },
                });
                expect(body.data.length).toBe(0);
                expect(statusCode).toBe(200);
            })

            it("should return 2 employees when filtering for PAINT_SHOP", async () => {
                const {body, statusCode} = await supertest(app).get("/employees?sortDir=desc&sortBy=firstName&pageNum=1&pageSize=10&filterBy=PAINT_SHOP");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 2,
                    },
                });
                expect(body.data.length).toBe(2);
                body.data.forEach((employee: Employee,) => {
                    expect(employee.department).toEqual(Department.PAINT_SHOP);
                })
                expect(statusCode).toBe(200);
            })

            it("should return 1 employee when searching for 'Olesen' and filtering by PAINT_SHOP", async () => {
                const {body, statusCode} = await supertest(app).get("/employees?sortDir=desc&sortBy=firstName&pageNum=1&pageSize=10&filterBy=PAINT_SHOP&searchValue=Olesen");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 1,
                    },
                });
                expect(body.data.length).toBe(1);
                expect(statusCode).toBe(200);
                body.data.forEach((employee: Employee,) => {
                    expect(employee.department).toEqual(Department.PAINT_SHOP);
                    expect(employee.lastName).toEqual("Olesen");
                })
            })

            it("should return an error if sortDir query is missing", async () => {
                const {statusCode} = await supertest(app).get("/employees?sortBy=firstName&pageNum=1&pageSize=10");

                expect(statusCode).toBe(400);
            });

            it("should return an error if sortBy query is missing", async () => {
                const {statusCode} = await supertest(app).get("/employees?sortDir=desc&pageNum=1&pageSize=10");

                expect(statusCode).toBe(400);
            });

            it("should return an error if pageSize query is missing", async () => {
                const {statusCode} = await supertest(app).get("/employees?sortDir=desc&sortBy=firstName&pageNum=1");

                expect(statusCode).toBe(400);
            });

            it("should return an error if pageNum query is missing", async () => {
                const {statusCode} = await supertest(app).get("/employees?sortDir=desc&sortBy=firstName&pageSize=10");

                expect(statusCode).toBe(400);
            });
        })

        describe("Get single employee", () => {
            it("should return the correct employee when specifying correct id", () => {

            })

            it("should return an error when an employee could not be found by the specified id", () => {

            })
        })

        describe("Create a new employee", () => {
            it("should successfully create a new employee", () => {

            })

            it("should fail to create an employee that is missing one property", () => {

            })
        })

    })


    /*
     ===========================================================================================================================================
     ===========================================================================================================================================
     ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS ORDERS
     ===========================================================================================================================================
     ===========================================================================================================================================
     */

    describe("Orders", () => {



        describe("Get many orders", () => {

        })

        describe("Get single order", () => {

        })

        describe("Create a new order", () => {

        })

        describe("Update order", () => {

        })

        describe("Delete order", () => {

        })

    })


    /*
     ===========================================================================================================================================
     ===========================================================================================================================================
     TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS TASKS
     ===========================================================================================================================================
     ===========================================================================================================================================
     */

    describe("Tasks", () => {
        it("should get all possible tasks (form)", () => {

        })

        it("should get a single task(instance) by id", () => {

        })

        it("should update a single task(instance)'s status to IN_PROGRESS by id and the first subtask(instance) to IN_PROGRESS", () => {

        })

        it("should create a new comment to a single task(instance)", () => {

        })
    })


    /*
     ===========================================================================================================================================
     ===========================================================================================================================================
     SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS SUBTASKS
     ===========================================================================================================================================
     ===========================================================================================================================================
     */
    describe("Subtasks", () => {

        it("should update a subtask(instance)'s status to COMPLETED by id", () => {

        })

        it("should update a subtask(instance)'s status to COMPLETED by id and finish the task(instance)", () => {

        })

        it("should update a subtask(instance)'s status to COMPLETED by id and finish the task(instance) and order", () => {

        })
    })


})