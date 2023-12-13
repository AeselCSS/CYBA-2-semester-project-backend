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


orderRouter.route("/orders")
    .post(validateCreateOrder, orderController.createOrderExecutor)
    .get(validateOrderQuery, orderController.getAllOrdersExecutor);

orderRouter.route("/orders/dates")
    .get(orderController.getAllOrdersStartDatesExecutor);

orderRouter.route("/orders/:id")
    .get(validateIdParamsInt, orderController.getSingleOrderExecutor);

orderRouter.route("/orders/:id/status")
    .patch(validateUpdateOrderStatus, orderController.updateOrderStatusExecutor);

orderRouter.route("/orders/:id/tasks")
    .patch(validateUpdateOrderTasks, orderController.updateOrderTasksExecutor);
