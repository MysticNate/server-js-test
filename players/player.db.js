import { readFile, writeFile } from "fs/promises";
import path from "path";
import { __dirname } from "../globals.js";

const filePath = path.join(__dirname, "DB", "players.json");

export async function findAllPlayers() {
    let data = await readFile(filePath);
    return JSON.parse(data.toString());
}

export async function findPlayerById(id) {
    let players = await findAllPlayers();
    return players.find((p) => p._id === id);
}

export async function addPlayerToDB(player) {
    let players = await findAllPlayers();
    players.push(player);
    await writeFile(filePath, JSON.stringify(players, null, 2));
    return player;
}

export async function updatePlayerInDB(id, updatedData) {
    let players = await findAllPlayers();
    const index = players.findIndex((p) => p._id === id);

    if (index === -1) return null;

    players[index] = { ...players[index], ...updatedData };

    await writeFile(filePath, JSON.stringify(players, null, 2));
    return players[index];
}

export async function deletePlayerFromDB(id) {
    let players = await findAllPlayers();
    const index = players.findIndex((p) => p._id === id);

    if (index === -1) return false;

    players.splice(index, 1);
    await writeFile(filePath, JSON.stringify(players, null, 2));
    return true;
}