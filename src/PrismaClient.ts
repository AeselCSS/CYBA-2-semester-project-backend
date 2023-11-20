import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
//Kør config(), så den kan læse din env fil. Config importeres ^
config();

const prisma = new PrismaClient();


export default prisma