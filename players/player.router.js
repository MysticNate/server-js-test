import { Router } from "express";
import {
    getAllPlayers,
    getPlayerById,
    createNewPlayer,
    loginPlayer,
    updatePlayer,
    deletePlayer,
} from "./player.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const playerRouter = Router();

playerRouter
    .get("/", authenticateToken, getAllPlayers)
    .get("/:id", authenticateToken, getPlayerById)
    .post("/register", createNewPlayer)
    .post("/login", loginPlayer)
    .put("/:id", authenticateToken, updatePlayer)
    .delete("/:id", authenticateToken, deletePlayer);

export default playerRouter;
