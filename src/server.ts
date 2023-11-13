import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

// import routes


// create express app
const app = express();
const port: string | number = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/", async (_req: Request, res: Response) => {
    res.send("Server.js is running🎉")
})

// start express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});