import fs from "fs/promises";
import path from "path";
import { __dirname, __filename } from "../../global.js";
import { Player } from "../../Player.js";
import bcrypt from "bcryptjs";

export async function findAllPlayers() {
  let players = await fs.readFile(
    path.join(__dirname, "DB_Players.JSON"),
    "utf-8"
  );
  return JSON.parse(players);
}

export async function playerLogin(email, pass) {
  // Find player by email
  let player = await findPlayerByEmail(email);
  // Try to match pass
  if (player && bcrypt.compareSync(pass, player.pass))
    // If match success => return player
    return player;

  // Else return null
  return null;
}
export async function findPlayerByEmail(email) {
  let players = await fs.readFile(
    path.join(__dirname, "DB_Players.JSON"),
    "utf-8"
  );
  players = JSON.parse(players);

  let player = players.Players.find((p) => p.email == email);
  return player;
}

export async function findSpecificPlayer(id) {
  let players = await fs.readFile(
    path.join(__dirname, "DB_Players.JSON"),
    "utf-8"
  );
  players = JSON.parse(players);

  let player = players.Players.find((p) => p._id == id);
  return player;
}
export async function AddPlayerToDB(player) {
  const filePath = path.join(__dirname, "DB_Players.JSON");

  // Read existing data
  let data = await fs.readFile(filePath, "utf-8");
  let json = JSON.parse(data);

  player.pass = bcrypt.hashSync(player.pass, 10);

  // Push new player (into "Player": ...)
  console.log(player);

  json.Players.push(player);

  // Write back full JSON
  await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");
}

export async function DeletePlayerFromDB(id) {
  const filePath = path.join(__dirname, "DB_Players.JSON");

  // Read existing data
  let data = await fs.readFile(filePath, "utf-8");
  let json = JSON.parse(data);

  const beforeCount = json.Players.length;
  json.Players = json.Players.filter((p) => p._id !== id);
  const afterCount = json.Players.length;

  if (beforeCount === afterCount) {
    return false; // Nothing was deleted
  }

  // Write updated data
  await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");
  return true;
}

export async function UpdatePlayerInDB(id, newFName) {
  const filePath = path.join(__dirname, "DB_Players.JSON");

  // Read DB file
  let data = await fs.readFile(filePath, "utf-8");
  let json = JSON.parse(data);

  // Find player
  let playerIndex = json.Players.findIndex((p) => String(p._id) === String(id));
  if (playerIndex === -1) {
    console.log("Player not found!");
    return false;
  }

  //  Update only fName (leave all other fields as is)
  json.Players[playerIndex].fName = newFName;

  //  Write updated JSON back
  await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");

  return true;
}
