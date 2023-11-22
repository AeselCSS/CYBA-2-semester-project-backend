import { Request, Response } from 'express';
import errorHandler from '../Utility/errorHandler.js';
import OrderService from './OrderService.js';

export default class OrderController {
    constructor() {}

    public async getAllOrdersExecutor(
        request: Request<{}, {}, {}, ReqQuery>,
        response: Response
    ) {
        const { sortDir, sortBy, pageNum, pageSize, searchValue, filterBy } =
            request.query;

        try {
            if (!sortDir || !sortBy || !pageNum || !pageSize)
                response.status(400).json({ error: 'Queries missing' });

            const queries = {
                sortBy,
                sortDir,
                pageSize: parseInt(pageSize),
                pageNum: parseInt(pageNum),
                searchValue: searchValue,
                filterBy: filterBy,
            };

            const orderService = new OrderService();
            const result = await orderService.getAllOrders(queries);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }

    public async getSingleOrderExecutor(
        request: Request<ReqParams, {}, {}, {}>,
        response: Response
    ) {
        const id = parseInt(request.params.id);
        try {
            if (!id) {
                response.status(400).json({ error: 'id is not a number' });
                return;
            }

            const orderService = new OrderService();
            const result = await orderService.getSingleOrder(id);

            response.status(200).json(result);
        } catch (error: any) {
            errorHandler(error, response);
        }
    }
}
