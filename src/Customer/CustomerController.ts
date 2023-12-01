import { Request, Response } from "express";
import CustomerService from "./CustomerService.js";
import errorHandler from "../Utility/errorHandler.js";

export default class CustomerController {
    constructor() {}

    public async getAllCustomersExecutor(request: Request<{}, {}, {}, ReqQuery>, response: Response) {
        const queries = {
            ...request.query,
            pageSize: parseInt(request.query.pageSize),
            pageNum: parseInt(request.query.pageNum),
        }

        try {
            const customerService = new CustomerService();
            const result = await customerService.getAllCustomers(queries);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async getSingleCustomerExecutor(request: Request<ReqParams, {}, {}, {}>, response: Response) {
        const id = request.params.id;

        try {
            const customerService = new CustomerService();
            const result = await customerService.getSingleCustomer(id);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async getAllOrdersByCustomerIdExecutor(request: Request<ReqParams, {}, {}, {pageNum: string, pageSize: string}>, response: Response) {
        const pageSize = parseInt(request.query.pageSize)
        const pageNum = parseInt(request.query.pageNum)
        const id = request.params.id;

        console.log(pageSize)
        console.log(pageNum)

        try {
            const customerService = new CustomerService();
            const result = await customerService.getAllOrdersByCustomerId(id, pageNum, pageSize);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async updateCustomerExecutor(request: Request<ReqParams, {}, CustomerReqBody, {}>, response: Response) {
        const id = request.params.id;

        try {
            const customerService = new CustomerService();
            const result = await customerService.updateCustomer(id, request.body);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async deleteCustomerExecutor(request: Request<ReqParams, {}, {}, {}>, response: Response) {
        const id = request.params.id;

        try {
            const customerService = new CustomerService();
            const result = await customerService.deleteCustomer(id);

            response.status(204).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async createCustomerExecutor(request: Request<{}, {}, CustomerReqBody, {}>, response: Response) {

        try {
            const customerService = new CustomerService();
            const result = await customerService.createCustomer(request.body);

            if (!result) {
                response.status(400).json({ message: "Customer already exists in the system" });
                return;
            }

            response.status(201).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }
}
