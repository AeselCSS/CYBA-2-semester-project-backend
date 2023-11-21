import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { customerRouter } from './Customer/CustomerRouter.js';
import carRouter from './Car/CarRouter.js';

export default function createServer() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    //Routes her
    app.use('/', customerRouter, carRouter);
    // Routes slut

    app.use('/', async (_req: Request, res: Response) => {
        res.send('Server.js is running🎉');
    });

    return app;
}
