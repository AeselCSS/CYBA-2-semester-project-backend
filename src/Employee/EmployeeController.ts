import {Request, Response} from "express";
import EmployeeService from "./EmployeeService.js";



export default class EmployeeController {

    constructor() {}


    public async getAllEmployeesExecutor(request: Request<{},{},{},ReqQuery>, response: Response) {
        const {sortDir, sortBy, pageNum, pageSize, searchValue, filterBy} = request.query;

        if (!sortDir || !sortBy || !pageNum || !pageSize) throw new Error("Queries missing");

        try {
            const queries = {
                sortBy,
                sortDir,
                pageSize: parseInt(pageSize),
                pageNum: parseInt(pageNum),
                searchValue: searchValue,
                filterBy: filterBy
            }

            const employeeService = new EmployeeService();
            const result = await employeeService.getAllEmployees(queries)

            response.status(200).json(result)
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({message: error.message})
            } else {
                response.status(500).json({message: error.message})
            }
        }
    }
}