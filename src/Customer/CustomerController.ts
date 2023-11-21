import { Request, Response } from "express";
import CustomerService from "./CustomerService.js";
import { Role } from "@prisma/client";

export default class CustomerController {
    constructor() {}

    public async getAllCustomersExecutor(request: Request<{}, {}, {}, ReqQuery>, response: Response) {
        const { sortDir, sortBy, pageNum, pageSize, searchValue } = request.query;

        try {
            if (!sortDir || !sortBy || !pageNum || !pageSize) throw new Error("Queries missing");

            const queries = {
                sortBy,
                sortDir,
                pageSize: parseInt(pageSize),
                pageNum: parseInt(pageNum),
                searchValue: searchValue,
            };

            const customerService = new CustomerService();
            const result = await customerService.getAllCustomers(queries);

            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    public async getSingleCustomerExecutor(request: Request<ReqParams, {}, {}, {}>, response: Response) {
        const id = request.params.id;

        try {
            if (!id) throw new Error("Id is not a number");

            const customerService = new CustomerService();
            const result = await customerService.getSingleCustomer(id);

            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    public async updateSingleCustomerExecutor(
        request: Request<ReqParams, {}, CustomerReqBody, {}>,
        response: Response
    ) {
        const id = request.params.id;

        try {
            if (!id) throw new Error("Id is not a number");
            if (
                !request.body.firstName ||
                !request.body.lastName ||
                !request.body.address ||
                !request.body.city ||
                !request.body.email ||
                !request.body.zip ||
                !request.body.phone
            )
                throw new Error("Customer property is missing");

            const customerProps = {
                ...request.body,
                role: Role.CUSTOMER,
            };

            const customerService = new CustomerService();
            const result = await customerService.updateSingleCustomer(id, customerProps);
            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }
}
