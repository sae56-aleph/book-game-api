/**
 * @file Instancie le serveur Express
 * @author Enzo MAROS
 */

import express from "express";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import getBook from "./controllers/bookController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Routes
app.get("/book/:slug", getBook);

app.use(errorMiddleware);

export default app;
