import express from 'express';
import CarController from './CarController.js';
const carController = new CarController();

const carRouter = express.Router();

carRouter.route('/car').get(carController.getAllCarsExecuter);

export default carRouter;
