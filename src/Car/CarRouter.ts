import express from 'express';
import CarController from './CarController.js';
import {validateCarQuery, validateCreateCar, validateUpdateMileageOnCar} from "../Utility/validation/carValidation.js";
import {validateIdParamsInt} from "../Utility/validation/validateIdParams.js";
const carController = new CarController();

export const carRouter = express.Router();

carRouter.route('/cars')
    .get(validateCarQuery, carController.getAllCarsExecuter)
    .post(validateCreateCar, carController.createCarExecuter);

carRouter.route('/cars/:id')
    .get(validateIdParamsInt, carController.getSingleCarExecuter)
    .patch(validateUpdateMileageOnCar, carController.updateMileageOnCarExecuter)
    .delete(validateIdParamsInt, carController.deleteCarExecuter);

carRouter.route("/cars/registration/:registrationNumber")
    .get(carController.getCarDetailsSynsbasenExecutor)

