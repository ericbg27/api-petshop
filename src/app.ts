import express from "express";
import { supplierRouter } from "./routes/supplierRoutes";

const app = express();

app.use(express.json());

app.use("/suppliers", supplierRouter);

export { app };