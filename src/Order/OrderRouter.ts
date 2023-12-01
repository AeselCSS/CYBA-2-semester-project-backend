import express from 'express';
import OrderController from './OrderController.js';
import {
    validateCreateOrder,
    validateOrderQuery,
    validateUpdateOrderStatus,
    validateUpdateOrderTasks
} from "../Utility/validation/orderValidation.js";
import {validateIdParamsInt} from "../Utility/validation/validateIdParams.js";

export const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.get('/orders', validateOrderQuery, orderController.getAllOrdersExecutor);
orderRouter.get('/orders/:id', validateIdParamsInt, orderController.getSingleOrderExecutor);
orderRouter.patch(
    '/orders/:id/status', validateUpdateOrderStatus, orderController.updateOrderStatusExecutor);
orderRouter.patch('/orders/:id/tasks', validateUpdateOrderTasks, orderController.updateOrderTasksExecutor);
orderRouter.post('/orders', validateCreateOrder, orderController.createOrderExecutor);
