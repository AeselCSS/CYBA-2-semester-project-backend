import {Request, Response} from "express";
import EmployeeService from "./EmployeeService.js";



export default class EmployeeController {
    constructor() {}

    public async getAllEmployeesExecutor(request: Request<{}, {}, {}, ReqQuery>, response: Response) {
        const { sortDir, sortBy, pageNum, pageSize, searchValue, filterBy } = request.query;

        try {
            if (!sortDir || !sortBy || !pageNum || !pageSize) throw new Error("Queries missing");

            const queries = {
                sortBy,
                sortDir,
                pageSize: parseInt(pageSize),
                pageNum: parseInt(pageNum),
                searchValue: searchValue,
                filterBy: filterBy,
            };

            const employeeService = new EmployeeService();
            const result = await employeeService.getAllEmployees(queries);

            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    public async getSingleEmployeeExecutor(request: Request<ReqParams, {}, {}, {}>, response: Response) {
        const id = request.params.id;

        try {
            if (!id) throw new Error("Id missing");

            const employeeService = new EmployeeService();
            const result = await employeeService.getSingleEmployee(id);

            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    public async createEmployeeExecutor(request: Request<{}, {}, EmployeeReqBody, {}>, response: Response) {
        const { department, role, firstName, lastName, id } = request.body;
        
        try {
            if (!department || !role || !firstName || !lastName || !id) throw new Error("Employee property is missing")
            

            const employeeService = new EmployeeService();
            const result = await employeeService.createEmployee(firstName, lastName, department, role, id)

            response.status(201).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }
}