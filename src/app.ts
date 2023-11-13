import express from "express";
import { Request, Response } from 'express';
import cors from 'cors';

export default function createServer() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use("/", async (_req: Request, res: Response) => {
        res.send("Server.js is running🎉")
    })

    //Routes her
    //app.use("/", artistrouter, albumrouter)
    // Routes slut

    return app;
}