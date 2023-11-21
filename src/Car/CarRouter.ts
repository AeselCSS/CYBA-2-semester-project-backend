import express from 'express';
import CarController from './CarController.js';
const carController = new CarController();

const carRouter = express.Router();

carRouter
    .route('/car')
    .get(carController.getAllCarsExecuter)
    .post(carController.createCarExecuter);

carRouter
    .route('/car/:id')
    .get(carController.getCarByIdExecuter)
    .put(carController.updateMilageOnCarExecuter)
    .delete(carController.deleteCarExecuter);

export default carRouter;
