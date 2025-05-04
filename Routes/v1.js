import { Router } from "express";
import playerRouter from "../Services/Players/player.router.js";
import uploadRouter from "../Services/Upload/upload.router.js";


const v1Router = new Router();

// Add micro services
v1Router.use('/players', playerRouter);
v1Router.use('/upload', uploadRouter);


export default v1Router;
