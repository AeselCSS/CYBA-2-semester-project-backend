import {Request, Response} from "express";
import CustomerService from "./CustomerService.js";

export default class CustomerController {
    constructor() {}


    public async getAllCustomersExecutor(request: Request<{},{},{},{sortDir: string, sortBy: string, pageNum: string, pageSize: string, searchValue?: string, filterBy?: string, }>, response: Response) {
        const {sortDir, sortBy, pageNum, pageSize, searchValue, filterBy} = request.query;

        try {
            if (!sortDir || !sortBy || !pageNum || !pageSize) throw new Error("Queries missing");

            const queries = {
                sortBy,
                sortDir,
                pageSize: parseInt(pageSize),
                pageNum: parseInt(pageNum),
                searchValue: searchValue,
                filterBy: filterBy
            }

            const customerService = new CustomerService();
            const result = await customerService.getAllCustomers(queries);

            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({message: error.message})
            } else {
                response.status(500).json({message: error.message})
            }
        }
    }
}