import { SECRET } from "../global.js";
import { ROLES } from "../Services/Players/player.roles.js";
import jwt from "jsonwebtoken";

export async function auth(req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  // Get the player from the token
  let player = jwt.verify(token, SECRET);
    console.log(player);

  let role  = player.role;
  if (role != ROLES.ADMIN)
    return res.status(403).json({ message: "Auth failed!" });
  // If all good continue (next)
  next();
}
