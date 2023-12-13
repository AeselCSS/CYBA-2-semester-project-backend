// @ts-ignore
import prisma from "../src/Database/PrismaClient";
// @ts-ignore
import {app} from "../src/server";
import supertest from "supertest";
import {Car, Customer, Department, Employee, Order, Role, Status, SubtaskInstance, TaskInstance} from "@prisma/client";


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

    //1-5
    const tasks = [
        {
            name: 'Task 1',
            description: 'Task 1 description',
        },
        {
            name: 'Task 2',
            description: 'Task 2 description',
        },
        {
            name: 'Task 3',
            description: 'Task 3 description'
        },
        {
            name: 'Task 4',
            description: "Task 4 description"
        },
        {
            name: 'Task 5',
            description: 'Task 5 description',
        },
    ];

    const subtasks = [
        // Delopgaver for Task 1 (1-3)
        {name: 'Olieudskiftning', time: 0.5, description: 'Dræn og udskift motorolie, og udskift oliefilter.'},
        {name: 'Filterudskiftning', time: 0.25, description: 'Udskift luft- og kabinefiltre.'},
        {name: 'Generel Inspektion', time: 0.75, description: 'Udfør en standard inspektion af køretøjets større systemer.'},

        // Delopgaver for Task 2 (4-6)
        {name: 'Hjulafmontering', time: 0.25, description: 'Fjern det nuværende sæt hjul fra køretøjet.'},
        {name: 'Hjulmontering', time: 0.25, description: 'Monter det nye sæt hjul passende til sæsonen.'},
        {name: 'Dæktrykskontrol', time: 0.2, description: 'Kontroller og juster dæktrykket til anbefalede niveauer.'},

        // Delopgaver for Task 3 (7-9)
        {name: 'A/C Ydelsestest', time: 0.5, description: 'Test køleydelsen af A/C-systemet.'},
        {name: 'Påfyldning af Kølemiddel', time: 0.5, description: 'Genoplad A/C-systemet med passende kølemiddel.'},
        {name: 'A/C Lækagetest', time: 0.5, description: 'Inspekter A/C-systemet for eventuelle lækager.'},

        // Delopgaver for Task 4 (10-12)
        {name: 'Inspektion af Bremseklodser', time: 0.25, description: 'Inspekter bremseklodser for slid og bestem, om udskiftning er nødvendig.'},
        {name: 'Udskiftning af Bremseklodser', time: 0.5, description: 'Udskift slidte bremseklodser.'},
        {name: 'Rotorinspektion', time: 0.25, description: 'Kontroller rotorer for skader eller slid.'},

        // Delopgaver for Task 5 (13-15)
        {name: 'Batteritest', time: 0.2, description: 'Test batteriets ladning og evne til at holde ladning.'},
        {name: 'Batteriinstallation', time: 0.25, description: 'Fjern det gamle batteri og installer et nyt.'},
        {name: 'Diagnose af Elektrisk System', time: 0.5, description: 'Kør en diagnostik for at kontrollere køretøjets elektriske system.'},
    ];


    const taskSubtaskJunctionTable: { taskId: number, subtaskId: number, subtaskNumber: number }[] = [];

    let taskIdCounter = 1; //++
    let subtaskNumberCounter = 1; //reset til 1
    for (let i = 1; i <= subtasks.length; i++) {
        if (subtaskNumberCounter === 4) {
            subtaskNumberCounter = 1;
            taskIdCounter++;
        }

        taskSubtaskJunctionTable.push({
            taskId: taskIdCounter,
            subtaskId: i,
            subtaskNumber: subtaskNumberCounter
        })

        subtaskNumberCounter++;
    }

    const orders = [
        {
            status: "AWAITING_CUSTOMER" as Status,
            orderStartDate: new Date(),
            carId: 2,
            customerId: "90b6fd6b4b4343ffa05e8278"
        },
        {
            status: "IN_PROGRESS" as Status,
            orderStartDate: new Date(),
            carId: 5,
            customerId: "8c081169f97e42479b136a6a"
        },
        {
            status: "AWAITING_CUSTOMER" as Status,
            orderStartDate: new Date(),
            carId: 3,
            customerId: "7925557bb8c34013ba1b33d5"
        },
    ]

    const taskInstances = [
        {
            status: "PENDING" as Status,
            taskId: 1,
            employeeId: null,
            orderId: 1
        },
        {
            status: "PENDING" as Status,
            taskId: 2,
            employeeId: null,
            orderId: 1
        },
        {
            status: "IN_PROGRESS" as Status,
            taskId: 4,
            employeeId: null,
            orderId: 2
        },
        {
            status: "PENDING" as Status,
            taskId: 5,
            employeeId: null,
            orderId: 3
        }
    ]

    const subtaskInstances = [
        {
            status: "PENDING" as Status,
            taskInstanceId: 1,
            subtaskId: 1,
        },
        {
            status: "PENDING" as Status,
            taskInstanceId: 1,
            subtaskId: 2,
        },
        {
            status: "PENDING" as Status,
            taskInstanceId: 1,
            subtaskId: 3,
        },
        {
            status: "PENDING" as Status,
            taskInstanceId: 2,
            subtaskId: 4,
        },
        {
            status: "PENDING" as Status,
            taskInstanceId: 2,
            subtaskId: 5,
        },
        {
            status: "PENDING" as Status,
            taskInstanceId: 2,
            subtaskId: 6,
        },
        {
            status: "COMPLETED" as Status,
            taskInstanceId: 3,
            subtaskId: 10,
        },
        {
            status: "COMPLETED" as Status,
            taskInstanceId: 3,
            subtaskId: 11,
        },
        {
            status: "IN_PROGRESS" as Status,
            taskInstanceId: 3,
            subtaskId: 12,
        },
        {
            status: "PENDING" as Status,
            taskInstanceId: 4,
            subtaskId: 13,
        },
        {
            status: "PENDING" as Status,
            taskInstanceId: 4,
            subtaskId: 14,
        },
        {
            status: "PENDING" as Status,
            taskInstanceId: 4,
            subtaskId: 15,
        },
    ]

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

        const createTasks = prisma.task.createMany({
            data: tasks
        })

        const createSubtasks = prisma.subtask.createMany({
            data: subtasks
        })

        const createTaskSubtasks = prisma.taskSubtask.createMany({
            data: taskSubtaskJunctionTable
        })

        const createOrders = prisma.order.createMany({
            data: orders
        })

        const createTaskInstances = prisma.taskInstance.createMany({
            data: taskInstances
        })

        const createSubtaskInstances = prisma.subtaskInstance.createMany({
            data: subtaskInstances
        })

        await prisma.$transaction([createCustomers, createCars, createEmployees, createTasks, createSubtasks, createTaskSubtasks, createOrders, createTaskInstances, createSubtaskInstances]);
    });

    afterAll(async () => {
        const deleteCustomers = prisma.customer.deleteMany();
        const deleteCars = prisma.car.deleteMany();
        const deleteOrders = prisma.order.deleteMany();
        const deleteEmployees = prisma.employee.deleteMany();
        const deleteTaskSubtasks = prisma.taskSubtask.deleteMany();
        const deleteTasks = prisma.task.deleteMany();
        const deleteSubtasks = prisma.subtask.deleteMany();
        const deleteSubtaskInstances = prisma.subtaskInstance.deleteMany();
        const deleteTaskInstances = prisma.taskInstance.deleteMany();
        const deleteTaskInstanceComments = prisma.taskInstanceComment.deleteMany();

        await prisma.$transaction([
            deleteTaskInstanceComments,
            deleteSubtaskInstances,
            deleteTaskInstances,
            deleteTaskSubtasks,
            deleteSubtasks,
            deleteTasks,
            deleteEmployees,
            deleteOrders,
            deleteCars,
            deleteCustomers,
        ]);

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
            let order: Order;
            let customer: Customer;
            let car: Car;

            beforeAll(async() => {
                customer = await prisma.customer.create({
                    data: {
                        id: "customerToDelete",
                        role: Role.CUSTOMER,
                        firstName: "Jens",
                        lastName: "Jensen",
                        address: "Kongensgade 77",
                        city: "Odense",
                        zip: 7018,
                        phone: 23453234,
                        email: "Jens.Jensen@post.dk",
                    }
                })

                car = await prisma.car.create({
                    data: {
                        registrationNumber: "ToDelete",
                        model: "3 Series",
                        modelVariant: "2.0 TDI (150 HK) Sedan, 4 dørs Forhjulstræk Automatisk",
                        firstRegistration: new Date("2023-02-19"),
                        mileage: 69450,
                        lastInspectionDate: new Date("2022-11-02"),
                        lastInspectionKind: "PeriodiskSyn",
                        customerId: "customerToDelete",
                        brand: "Tesla",
                        lastInspectionResult: "Godkendt",
                        vinNumber: "T7WUE8ZRV232232H9738U1P",
                    }
                })

                order = await prisma.order.create({
                    data: {
                        status: "AWAITING_CUSTOMER" as Status,
                        orderStartDate: new Date(),
                        carId: car.id,
                        customerId: "customerToDelete"
                    }
                })

            })


            it('should delete the customer and their cars successfully and replace all their relations with "order" and "car" with id=DELETED', async () => {

                const {statusCode} = await supertest(app).delete("/customers/customerToDelete");

                const updatedOrder = await prisma.order.findFirst({
                    where: {
                        id: order.id
                    }
                })

                const deletedCar = await prisma.car.findFirst({
                    where: {
                        id: car.id
                    }
                })

                const deletedCustomer = await prisma.customer.findFirst({
                    where: {
                        id: customer.id
                    }
                })

                expect(statusCode).toBe(204);
                expect(updatedOrder?.customerId).toEqual("DELETED")
                expect(updatedOrder?.carId).toEqual(1);
                expect(deletedCar).toBeFalsy();
                expect(deletedCustomer).toBeFalsy();
            });

            it("should fail to delete a customer which does not exist", async () => {
                const {statusCode} = await supertest(app).delete("/customers/999999999999asb");

                expect(statusCode).toBe(404);
            });

            afterAll(async () => {

                await prisma.order.delete({
                    where: {
                        id: order.id
                    }
                })

            })
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
                const carsSorted = (cars as Car[]).sort((a, b) => a.mileage - b.mileage)

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
                const carsSorted = (cars as Car[]).sort((a, b) => b.brand.localeCompare(a.brand))

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

            it("should successfully create a new car without inspectionDate,-Kind and -Result defined", async () => {
                const payloadCar: Record<string, string | Date | number | null> = {
                    registrationNumber: "NEWCAR11",
                    model: "Civic",
                    modelVariant: "1.5 i-VTEC (180 HK) Sedan, 4 dørs Front-wheel Drive Automatisk",
                    firstRegistration: new Date("2023-05-20"),
                    mileage: 30000,
                    lastInspectionDate: null,
                    lastInspectionKind: null,
                    lastInspectionResult: null,
                    customerId: "8c081169f97e42479b136a6a",
                    brand: "Honda",
                    vinNumber: "XYZ789CBA1233333",
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

            it("should fail to create a new car if a car with same registration nr. and vin number exists already", async () => {
                const payloadThree = cars[1];

                const {statusCode} = await supertest(app).post(`/cars`).send(payloadThree).set("Content-Type", "application/json");

                expect(statusCode).toBe(404);
            })
        })


        describe("Update car", () => {
            let createdCar: Car;

            beforeAll(async () => {
                const car = {
                    registrationNumber: "PDIC22",
                    model: "3 Series",
                    modelVariant: "2.0 TDI (150 HK) Sedan, 4 dørs Forhjulstræk Automatisk",
                    firstRegistration: new Date("2023-02-19"),
                    mileage: 69450,
                    lastInspectionDate: new Date("2022-11-02"),
                    lastInspectionKind: "PeriodiskSyn",
                    customerId: "90b6fd6b4b4343ffa05e8278",
                    brand: "Tesla",
                    lastInspectionResult: "Godkendt",
                    vinNumber: "T7WUE8ZRVH912333",
                }

                createdCar = await prisma.car.create({
                    data: car
                })

            })


            it("should update the car mileage property", async () => {
                const payload = {
                    mileage: 12345
                };

                const {body, statusCode} = await supertest(app).patch(`/cars/${createdCar.id}`).send(payload).set("Content-Type", "application/json");

                expect(body.mileage).toEqual(payload.mileage)
                expect(statusCode).toBe(200)
            })

            it("should fail to update mileage on car if it of type string", async () => {
                const payload = {
                    mileage: "12345"
                }

                const {statusCode} = await supertest(app).patch(`/cars/${createdCar.id}`).send(payload).set("Content-Type", "application/json");

                expect(statusCode).toBe(400)
            })

            it("should fail to update a customer if a property is missing", async () => {
                const {statusCode} = await supertest(app).patch(`/cars/${createdCar.id}`).set("Content-Type", "application/json");

                expect(statusCode).toBe(400)
            })
        })

        describe("Delete car", () => {
            let car: Car;
            let order: Order;

            it("should fail to delete a car which does not exist", async () => {
                const {statusCode} = await supertest(app).delete(`/cars/12342312324214233`);

                expect(statusCode).toBe(404)
            })

            beforeAll(async () => {

                car = await prisma.car.create({
                    data: {
                        registrationNumber: "L7V2RI",
                        model: "X5",
                        modelVariant: "2.0 TDI (150 HK) Sedan, 4 dørs Forhjulstræk Automatisk",
                        firstRegistration: new Date("2023-11-02"),
                        mileage: 114669,
                        lastInspectionDate: new Date("2022-08-06"),
                        lastInspectionKind: "PeriodiskSyn",
                        customerId: "7925557bb8c34013ba1b33d5",
                        brand: "Tesla",
                        lastInspectionResult: "Ikke Godkendt",
                        vinNumber: "48W08HEBrerPP73KAXRD",
                    }
                })

                order = await prisma.order.create({
                    data: {
                        status: "AWAITING_CUSTOMER" as Status,
                        orderStartDate: new Date(),
                        carId: car.id,
                        customerId: "7925557bb8c34013ba1b33d5"
                    }
                })
            })


            it("should delete the car successfully and replace all their relations with 'order' with carId=1", async () => {
                const {statusCode} = await supertest(app).delete(`/cars/${car.id}`);

                expect(statusCode).toBe(204)

                const updatedOrder = await prisma.order.findFirst({
                    where: {
                        id: order.id
                    }
                })

                const deletedCar = await prisma.car.findFirst({
                    where: {
                        id: car.id
                    }
                })

                expect(statusCode).toBe(204);
                expect(updatedOrder?.customerId).toEqual("7925557bb8c34013ba1b33d5")
                expect(updatedOrder?.carId).toEqual(1);
                expect(deletedCar).toBeFalsy();
            })


            afterAll(async () => {

                await prisma.order.delete({
                    where: {
                        id: order.id
                    }
                })
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
                const sortedEmployees = employees.sort((a, b) => a.firstName.localeCompare(b.firstName))

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
                const sortedEmployees = employees.sort((a, b) => b.lastName.localeCompare(a.lastName))

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
            let createdEmployee: Employee;

            beforeAll(async () => {
                const payload = {
                    id: "testPayload",
                    role: "EMPLOYEE" as Role,
                    department: "ADMINISTRATION" as Department,
                    firstName: "payloadFirstName",
                    lastName: "payloadLastName"
                }

                createdEmployee = await prisma.employee.create({
                    data: payload
                })
            })


            it("should return the correct employee when specifying correct id", async () => {

                const {body, statusCode} = await supertest(app).get(`/employees/${createdEmployee.id}`);

                expect(statusCode).toBe(200);
                for (const [key] of Object.keys(createdEmployee)) {
                    //@ts-ignore
                    expect(body[key]).toEqual(createdEmployee[key]);
                }
            })

            it("should return an error when an employee could not be found by the specified id", async () => {

                const {statusCode} = await supertest(app).get(`/employees/wrongId`);

                expect(statusCode).toBe(404);
            })
        })

        describe("Create a new employee", () => {
            it("should successfully create a new employee", async () => {
                const payload: Record<string, string> = {
                    id: "testPayload2",
                    role: "EMPLOYEE" as Role,
                    department: "ADMINISTRATION" as Department,
                    firstName: "payloadFirstName2",
                    lastName: "payloadLastName2"
                }

                const {body, statusCode} = await supertest(app).post(`/employees`).send(payload).set("Content-Type", "application/json");

                for (const [key] of Object.keys(payload)) {
                    expect(body[key]).toEqual(payload[key]);
                }
                expect(statusCode).toBe(201);
            })

            it("should fail to create an employee that is missing one property", async () => {
                const payload: Record<string, string> = {
                    role: "EMPLOYEE" as Role,
                    department: "ADMINISTRATION" as Department,
                    firstName: "payloadFirstName2",
                    lastName: "payloadLastName2"
                }

                const {statusCode} = await supertest(app).post(`/employees`).send(payload).set("Content-Type", "application/json");

                expect(statusCode).toBe(400);
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
            it("should return all 2 orders when filtering AWAITING_CUSTOMER", async () => {
                const {body, statusCode} = await supertest(app).get("/orders?sortDir=desc&sortBy=id&pageNum=1&pageSize=10&filterBy=AWAITING_CUSTOMER");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 2,
                    },
                });
                expect(body.data.length).toBe(2);
                body.data.forEach((order: Order) => {
                    expect(order.status).toEqual(("AWAITING_CUSTOMER" as Status));
                })
                expect(statusCode).toBe(200);
            })

            it("should return the correct order(s) when searching for a car registration number", async () => {
                const {body, statusCode} = await supertest(app).get("/orders?sortDir=desc&sortBy=id&pageNum=1&pageSize=10&searchValue=L7V9RZ");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 1,
                    },
                });
                expect(body.data.length).toBe(1);
                expect(body.data[0].registrationNumber).toBe("L7V9RZ")
                expect(statusCode).toBe(200);
            })

            it("should return 0 orders when there is no search match", async () => {
                const {body, statusCode} = await supertest(app).get("/orders?sortDir=desc&sortBy=id&pageNum=1&pageSize=10&searchValue=AB20069");

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

            it("should return 1 order when filtering by AWAITING_CUSTOMER and searching 'PDI3QC' ", async () => {
                const {body, statusCode} = await supertest(app).get("/orders?sortDir=desc&sortBy=id&pageNum=1&pageSize=10&searchValue=PDI3QC&filterBy=AWAITING_CUSTOMER");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 1,
                    },
                });

                expect(body.data.length).toBe(1);
                expect(body.data[0].registrationNumber).toBe("PDI3QC")
                expect(body.data[0].status).toEqual(("AWAITING_CUSTOMER") as Status)
                expect(statusCode).toBe(200);
            })

            it("should sort orders by order id asc", async () => {
                const sortedOrders: Order[] = await prisma.order.findMany({
                    orderBy: {
                        id: "asc"
                    }
                })

                const {body, statusCode} = await supertest(app).get("/orders?sortDir=asc&sortBy=id&pageNum=1&pageSize=10");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 3,
                    },
                });


                sortedOrders.forEach((localOrder, index) => {
                    expect(body.data[index].id).toEqual(localOrder.id);
                });
                expect(statusCode).toBe(200);
            })

            it("should sort orders by order id desc", async () => {
                const sortedOrders: Order[] = await prisma.order.findMany({
                    orderBy: {
                        id: "desc"
                    }
                })

                const {body, statusCode} = await supertest(app).get("/orders?sortDir=desc&sortBy=id&pageNum=1&pageSize=10");

                expect(body).toEqual({
                    data: expect.any(Array),
                    metaData: {
                        limit: expect.any(Number),
                        offset: expect.any(Number),
                        totalCount: 3,
                    },
                });


                sortedOrders.forEach((localOrder, index) => {
                    expect(body.data[index].id).toEqual(localOrder.id);
                });
                expect(statusCode).toBe(200);
            })

            it("should return an error if sortDir query is missing", async () => {
                const {statusCode} = await supertest(app).get("/orders?sortBy=firstName&pageNum=1&pageSize=10");

                expect(statusCode).toBe(400);
            });

            it("should return an error if sortBy query is missing", async () => {
                const {statusCode} = await supertest(app).get("/orders?sortDir=desc&pageNum=1&pageSize=10");

                expect(statusCode).toBe(400);
            });

            it("should return an error if pageSize query is missing", async () => {
                const {statusCode} = await supertest(app).get("/orders?sortDir=desc&sortBy=firstName&pageNum=1");

                expect(statusCode).toBe(400);
            });

            it("should return an error if pageNum query is missing", async () => {
                const {statusCode} = await supertest(app).get("/orders?sortDir=desc&sortBy=firstName&pageSize=10");

                expect(statusCode).toBe(400);
            });

        })

        describe("Get single order", () => {
            it("should return the correct order when specifying the an id", async () => {
                const {body, statusCode} = await supertest(app).get("/orders/1");

                expect(body.customer).toBeTruthy();
                expect(body.tasks).toBeTruthy();
                expect(body.tasks[0].subtasks).toBeTruthy();
                expect(body.id).toBe(1);
                expect(statusCode).toBe(200);
            })

            it("should return an error if no order is found by the specified id", async () => {
                const {statusCode} = await supertest(app).get("/orders/999999999999999");

                expect(statusCode).toBe(404);
            })
        })

        describe("Create a new order", () => {
            it("should successfully create a new order and its task- and subtask instances", async () => {
                const orderPayload = {
                    orderStartDate: "2023-11-23",
                    carId: 3,
                    customerId: "7925557bb8c34013ba1b33d5",
                    tasks: [
                        {
                            id: 4
                        },
                        {
                            id: 2
                        }
                    ]
                }

                const {body, statusCode} = await supertest(app).post("/orders").send(orderPayload).set("Content-Type", "application/json");


                expect(body.car.id).toBe(3);
                expect(body.car.vinNumber).toBe("48W08HEBPP73KAXRD");
                expect(body.customer.id).toBe("7925557bb8c34013ba1b33d5")
                expect(body.customer.firstName).toBe("Sofie")
                expect(body.customer.lastName).toBe("Jensen")
                expect(body.tasks.length).toBe(2);
                expect(body.tasks[0].subtasks.length).toBe(3);
                expect(body.tasks[1].subtasks.length).toBe(3);
                expect(statusCode).toBe(200);

                body.tasks.forEach((task: any) => {
                    expect(task.status).toEqual(("PENDING") as Status)

                    task.subtasks.forEach((subtask: SubtaskInstance) => {
                        expect(subtask.status).toEqual(("PENDING") as Status);
                    })
                })
            })


            it("should fail to create an order if task ids are passed wrong", async () => {
                const orderPayload = {
                    orderStartDate: "2023-11-24",
                    carId: 3,
                    customerId: "7925557bb8c34013ba1b33d5",
                    tasks: [
                        4,
                        2
                    ]
                }

                const {statusCode} = await supertest(app).post("/orders").send(orderPayload).set("Content-Type", "application/json");

                expect(statusCode).toBe(400)
            })
        })

        describe("Update order", () => {

            beforeAll(async () => {
                //id 7
                await prisma.order.create({
                    data: {
                        status: "PENDING" as Status,
                        orderStartDate: new Date("1990-12-01"),
                        carId: 3,
                        customerId: "7925557bb8c34013ba1b33d5"
                    }
                })

                await prisma.taskInstance.create({
                    data: {
                        status: "PENDING" as Status,
                        taskId: 1,
                        employeeId: null,
                        orderId: 7
                    },
                })

                await prisma.subtaskInstance.createMany({
                    data: [
                        {
                            status: "PENDING" as Status,
                            taskInstanceId: 5,
                            subtaskId: 1,
                        },
                        {
                            status: "PENDING" as Status,
                            taskInstanceId: 5,
                            subtaskId: 2,
                        },
                        {
                            status: "PENDING" as Status,
                            taskInstanceId: 5,
                            subtaskId: 3,
                        },
                    ]
                })
            })

            const payload = {
                status: "IN_PROGRESS" as Status
            }

            it("should update the status on a single order from PENDING to IN_PROGRESS", async () => {

                const {body, statusCode} = await supertest(app).patch("/orders/7/status").send(payload).set("Content-Type", "application/json");

                const taskInstances = await prisma.taskInstance.findMany({
                    where: {
                        orderId: 7
                    }
                })

                const taskInstancesIds = taskInstances.map((taskInstance: TaskInstance) => taskInstance.id)

                const subtaskInstances = await prisma.subtaskInstance.findMany({
                    where: {
                        taskInstanceId: {in: taskInstancesIds}
                    }
                })

                taskInstances.forEach((taskInstance: TaskInstance) => {
                    expect(taskInstance.status).toEqual(("PENDING") as Status)
                })

                subtaskInstances.forEach((subtaskInstance: SubtaskInstance) => {
                    expect(subtaskInstance.status).toEqual(("PENDING") as Status);
                })


                expect(body.status).toEqual(("IN_PROGRESS") as Status);
                expect(statusCode).toBe(200);
            })

            it("should give an error if trying to update a status on an order, which does not exist", async () => {

                const {statusCode} = await supertest(app).patch("/orders/9999999/status").send(payload).set("Content-Type", "application/json");
                expect(statusCode).toBe(404);
            })

            it("should fail to update a single order from IN_PROGRESS", async () => {
                const order: Order = await prisma.order.create({
                    data: {
                        status: "IN_PROGRESS" as Status,
                        orderStartDate: new Date(),
                        carId: 3,
                        customerId: "7925557bb8c34013ba1b33d5"
                    }
                })

                const {statusCode} = await supertest(app).patch(`/orders/${order.id}/status`).send(payload).set("Content-Type", "application/json");
                expect(statusCode).toBe(404);
            })

            it("should fail to update a single order that is status COMPLETED", async () => {
                const order: Order = await prisma.order.create({
                    data: {
                        status: "COMPLETED" as Status,
                        orderStartDate: new Date(),
                        carId: 3,
                        customerId: "7925557bb8c34013ba1b33d5"
                    }
                })

                const {statusCode} = await supertest(app).patch(`/orders/${order.id}/status`).send(payload).set("Content-Type", "application/json");
                expect(statusCode).toBe(404);
            })

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
        it("should get all possible tasks (form)", async () => {
            const {body, statusCode} = await supertest(app).get(`/tasks`)

            expect(body.length).toBe(tasks.length)
            expect(statusCode).toBe(200);
        })

        it("should get a single task(instance) by id", async () => {
            const taskInstance = taskInstances[2]

            const {body, statusCode} = await supertest(app).get(`/tasks/3`)

            for (const [key] of Object.keys(taskInstance)) {
                //@ts-ignore
                expect(body[key]).toEqual(taskInstance[key]);
            }
            expect(statusCode).toBe(200);
        })

        it("should update a single task(instance)'s status to IN_PROGRESS by id and the first subtask(instance) to IN_PROGRESS", async () => {

            const employeePayload = {
                employeeId: "2"
            }

            await prisma.order.update({
                data: {
                    status: "IN_PROGRESS" as Status
                },
                where: {
                    id: 3
                }
            })

            const {body, statusCode} = await supertest(app).patch(`/tasks/4`).send(employeePayload).set("Content-Type", "application/json");


            for (const task of body.tasks) {
                if (task.id === 4) {
                    expect(task.status).toEqual(("IN_PROGRESS") as Status)
                    expect(task.employee.firstName).toEqual("Emma")
                    expect(task.employee.lastName).toEqual("Brown")
                    expect(task.subtasks[0].status).toEqual(("IN_PROGRESS") as Status);
                    expect(task.subtasks[1].status).toEqual(("PENDING") as Status);
                    expect(task.subtasks[2].status).toEqual(("PENDING") as Status);
                } else {
                    expect(task.status).toEqual(("PENDING") as Status)
                    task.subtasks.forEach((subtask: SubtaskInstance) => expect(subtask.status).toEqual(("PENDING") as Status))
                }
            }

            expect(statusCode).toBe(200)
        })

        it("should create a new comment to a single task(instance)", async () => {
            const payload = {
                employeeId: "2",
                comment: "Test comment"
            }

            const {body, statusCode} = await supertest(app).post(`/tasks/4/comments`).send(payload).set("Content-Type", "application/json");

            expect(statusCode)
            expect(body.comment).toEqual(payload.comment)
            expect(body.employeeId).toEqual(payload.employeeId)
            expect(body.taskInstanceId).toBe(4)
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

        beforeAll(async () => {

            //id 10
            await prisma.order.create({
                data: {
                    status: "IN_PROGRESS" as Status,
                    orderStartDate: new Date("2000-12-03"),
                    carId: 2,
                    customerId: "90b6fd6b4b4343ffa05e8278"
                },
            })

            //id: 8 og 9
            await prisma.taskInstance.createMany({
                data: [
                    {
                        status: "IN_PROGRESS" as Status,
                        taskId: 1,
                        employeeId: "2",
                        orderId: 10
                    },
                    {
                        status: "IN_PROGRESS" as Status,
                        taskId: 2,
                        employeeId: "2",
                        orderId: 10
                    },
                ]
            })

            //id 22-27
            await prisma.subtaskInstance.createMany({
                data: [
                    {
                        status: "COMPLETED" as Status,
                        taskInstanceId: 8,
                        subtaskId: 1,
                    },
                    {
                        status: "IN_PROGRESS" as Status,
                        taskInstanceId: 8,
                        subtaskId: 2,
                    },
                    {
                        status: "PENDING" as Status,
                        taskInstanceId: 8,
                        subtaskId: 3,
                    },
                    {
                        status: "COMPLETED" as Status,
                        taskInstanceId: 9,
                        subtaskId: 4,
                    },
                    {
                        status: "COMPLETED" as Status,
                        taskInstanceId: 9,
                        subtaskId: 5,
                    },
                    {
                        status: "IN_PROGRESS" as Status,
                        taskInstanceId: 9,
                        subtaskId: 6,
                    },
                ]
            })


        })

        it("should update a subtask(instance)'s status to COMPLETED by id", async () => {
            const {body, statusCode} = await supertest(app).patch(`/subtasks/23`);

            expect(statusCode).toBe(200)
            expect(body.status).toEqual(("IN_PROGRESS") as Status);
            for (const task of body.tasks) {
                if (task.id === 8) {
                    expect(task.status).toEqual(("IN_PROGRESS") as Status);
                    expect(task.subtasks[0].status).toEqual(("COMPLETED") as Status);
                    expect(task.subtasks[1].status).toEqual(("COMPLETED") as Status);
                    expect(task.subtasks[2].status).toEqual(("IN_PROGRESS") as Status);
                }
            }
        })

        it("should update a subtask(instance)'s status to COMPLETED by id and finish the task(instance)", async () => {
            const {body, statusCode} = await supertest(app).patch(`/subtasks/24`);

            expect(statusCode).toBe(200)
            expect(body.status).toEqual(("IN_PROGRESS") as Status);
            for (const task of body.tasks) {
                if (task.id === 8) {
                    expect(task.status).toEqual(("COMPLETED") as Status);
                    task.subtasks.forEach((subtask: SubtaskInstance) => expect(subtask.status).toEqual(("COMPLETED") as Status));
                }
            }
        })

        it("should update a subtask(instance)'s status to COMPLETED by id and finish the task(instance) and order", async () => {
            const {body, statusCode} = await supertest(app).patch(`/subtasks/27`);

            expect(statusCode).toBe(200)
            expect(body.status).toEqual(("COMPLETED") as Status);
            for (const task of body.tasks) {
                expect(task.status).toEqual(("COMPLETED") as Status);
                task.subtasks.forEach((subtask: SubtaskInstance) => expect(subtask.status).toEqual(("COMPLETED") as Status));
            }
        })
    })

})