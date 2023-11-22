import express from "express";
import OrderController from "./OrderController.js";


export const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.get("/orders", orderController.getAllOrdersExecutor)
// orderRouter.get("/orders/:id", orderController.)