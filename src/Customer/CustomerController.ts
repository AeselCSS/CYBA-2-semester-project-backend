import {Request, Response} from "express";
import CustomerService from "./CustomerService.js";
import {ReqParams, ReqQuery} from "../../shared.types.js";


export default class CustomerController {
    constructor() {}


    public async getAllCustomersExecutor(request: Request<ReqParams,{},{},ReqQuery>, response: Response) {
        const {sortDir, sortBy, pageNum, pageSize, searchValue} = request.query;

        try {
            if (!sortDir || !sortBy || !pageNum || !pageSize) throw new Error("Queries missing");

            const queries = {
                sortBy,
                sortDir,
                pageSize: parseInt(pageSize),
                pageNum: parseInt(pageNum),
                searchValue: searchValue,
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