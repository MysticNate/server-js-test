import * as db from "./player.db.js";

export async function AllPlayers(id) {
  if (!id) return await db.findAllPlayers();

  // else
  return await db.findSpecificPlayer(id);
}

export async function AddPlayer(player) {
  let playerR = await db.AddPlayerToDB(player);
  if (playerR) {
    delete playerR.pass;

    return playerR;
  }

  return null;
}

export async function DeletePlayerFromDB(id) {
  return await db.DeletePlayerFromDB(id);
}
export async function UpdatePlayerInDB(id, newFName) {
  return await db.UpdatePlayerInDB(id, newFName);
}

export async function playerLogin(email, pass) {
  return await db.playerLogin(email, pass);
}
