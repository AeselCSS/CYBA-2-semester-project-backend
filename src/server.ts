import 'dotenv/config';
import createServer from "./app.js";
import prisma from "./Database/PrismaClient.js";

// create express app
export const app = createServer();
const port: string | number = process.env.PORT || 3000;

//Synsbasen APIkey and URL
export const synsbasenURL = "https://api.synsbasen.dk/v1/";
export const synsbasenToken = process.env.SYNSBASEN_TOKEN as string

// start express server
app.listen(port, async () => {
    await prisma.$connect();
    console.log(`Server is running on port ${port}`);
});