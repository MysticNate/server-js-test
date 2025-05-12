import { Router } from "express";
import { auth } from "../../Middlewares/auth.js";

import * as ctrl from "./player.controller.js";

const playerRouter = Router();

playerRouter
  .get("/", ctrl.getAllPlayers)
  .get("/:id", ctrl.getPlayerById)
  .post("/", ctrl.createNewPlayer)
  .post("/login", ctrl.loginUser)
  .put("/:id", auth, ctrl.updatePlayer)
  .delete("/:id", auth, ctrl.deletePlayer);

// Default exportation allows to not use '{}' when importing.
// e.g. import playerRouter from "../Players/player.router";
// NOT import { playerRouter } from "../Players/player.router";
export default playerRouter;
