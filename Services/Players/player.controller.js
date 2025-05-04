import { SECRET } from "../../global.js";
import { Player } from "../../Player.js";
import * as md from "./player.model.js";

import jwt from "jsonwebtoken";

// .get("/", getAllPlayers)
//   .get("/:id", getPlayerById)
//   .post("/", createNewPlayer)
//   .put("/:id", updatePlayer)
//   .delete("/:id", deletePlayer);

export async function getAllPlayers(req, res) {
  // res.send("Hello I'm the getALLPlayers :D:D:D");

  let players = await Player.GetAllPlayers();

  if (!players) return res.status(404).json({ message: "No players found" });

  //else
  return res.status(200).json({ message: "Here are the players", players });
}

export async function getPlayerById(req, res) {
  let { id } = req.params;

  // If id is not a number do not call function
  if (isNaN(id)) return res.status(400).json({ message: "Bad request.." });

  let player = await Player.GetPlayersByID(id);

  if (!player) return res.status(404).json({ message: "Not Found." });

  //else
  return res
    .status(200)
    .json({ message: `Here is player with ID ${id}`, player });
}


// WAYPOINT ADD \\
export async function createNewPlayer(req, res) {

  let { id, email, pass, fName, lName, buyInAmount, buyOutAmount, role } =
    req.body;

  if (
    !id ||
    !email ||
    !pass ||
    !fName ||
    !lName ||
    !buyInAmount ||
    !buyOutAmount
  )
    return res.status(400).json({ message: "Some data is missing.." });

  let player = new Player(
    id,
    email,
    pass,
    fName,
    lName,
    buyInAmount,
    buyOutAmount,
    role
  );

  if (player.pass.length < 5)
    return res.status(403).json({ message: "Password is too small.." });

  // If all is good.. continue
  await player.AddPlayer();
  let token = jwt.sign(player, SECRET, { algorithm: "HS256", expiresIn: '1h' });
  return res.status(201).json({ message: "Player added successfully!", token });
}


// TODO:

export async function deletePlayer(req, res) {
  const id = parseInt(req.params.id);
  const success = await md.DeletePlayerFromDB(id);

  if (!success) {
    return res.status(404).json({ message: "Player not found" });
  }

  return res.json({ message: "Player deleted successfully!" });
}

export async function updatePlayer(req, res) {
  const id = parseInt(req.params.id);
  const newData = req.body;

  const success = await md.UpdatePlayerInDB(id, newData);

  if (!success) {
    return res.status(404).json({ message: "Player not found" });
  }

  return res.json({ message: "Player updated successfully!" });
}
// export async function updatePlayer(req, res) {
//   await Player.somethjing(); // Check middleware error handler
// }
// export async function deletePlayer(req, res) {
//   console.log("YOU DELETED!");
  
// }

// WAYPOINT LOGIN \\
export async function loginUser(req, res) {
  let { email, pass } = req.body;

  if (!email || !pass)
    res.status(400).json({ message: "Some or all credentials are missing.." });

  let player = await md.playerLogin(email, pass);

  if (!player) res.status(401).json({ message: "Invalid credentials!" });
  // IMPORTANT Deleting a field \\
  else delete player.pass;
  // TODO: Add token for user
  let token = jwt.sign(player, SECRET, { algorithm: "HS256" , expiresIn: '1h' });
  res.status(200).json({ message: "Login Successful!", token });
}
