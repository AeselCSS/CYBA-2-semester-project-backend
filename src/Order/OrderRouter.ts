import express from 'express';
import OrderController from './OrderController.js';

export const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.get('/orders', orderController.getAllOrdersExecutor);
orderRouter.get('/orders/:id', orderController.getSingleOrderExecutor);
orderRouter.patch("/orders/:id/status", orderController.updateOrderStatusExecutor);
orderRouter.patch("/orders/:id/tasks");