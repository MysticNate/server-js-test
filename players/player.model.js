import {
    findAllPlayers,
    findPlayerById,
    findPlayerByEmail,
    addPlayerToDB,
    updatePlayerInDB,
    deletePlayerFromDB,
} from "./player.db.js";

export async function allPlayers() {
    return await findAllPlayers();
}

export async function getPlayerById(id) {
    return await findPlayerById(id);
}

export async function getPlayerByEmail(email) {
    return await findPlayerByEmail(email);
}

export async function addPlayer(player) {
    return await addPlayerToDB(player);
}

export async function updatePlayer(id, playerData) {
    return await updatePlayerInDB(id, playerData);
}

export async function deletePlayer(id) {
    return await deletePlayerFromDB(id);
}
