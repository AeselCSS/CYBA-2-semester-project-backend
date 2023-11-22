import express from 'express';
import CarController from './CarController.js';
const carController = new CarController();

const carRouter = express.Router();

carRouter
    .route('/cars')
    .get(carController.getAllCarsExecuter)
    .post(carController.createCarExecuter);

carRouter
    .route('/cars/:id')
    .get(carController.getSingleCarExecuter)
    .patch(carController.updateMileageOnCarExecuter)
    .delete(carController.deleteCarExecuter);

export default carRouter;
