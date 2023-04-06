import express, { Express } from "express";
import connectToDatabase from "./utility/databse";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
