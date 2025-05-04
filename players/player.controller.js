import { writeFile } from "fs/promises";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { allPlayers, addPlayer } from "./player.model.js";
import { __dirname } from "../globals.js";

const filePath = path.join(__dirname, "DB", "players.json");

const SECRET = "secretKey"; 

export async function getAllPlayers(req, res) {
    let players = await allPlayers();
    if (!players.length)
        return res.status(404).json({ message: "no players found" });

    return res.status(200).json({ message: "found ya", players });
}

export async function getPlayerById(req, res) {
    let { id } = req.params;
    let player = await allPlayers(id);
    if (!player) return res.status(404).json({ message: "player not found" });

    return res.status(200).json({ message: "found ya", player });
}

export async function createNewPlayer(req, res) {
    const { _id, email, pass, fName, lName } = req.body;

    if (!_id || !email || !pass || !fName || !lName) {
        return res.status(400).json({ message: "missing data" });
    }

    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltRounds);

    const player = await addPlayer({
        _id,
        email,
        pass: hashedPass,
        fName,
        lName,
        GameStats: [],
    });

    return res.status(201).json({ message: "successfully added", player });
}



export async function loginPlayer(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "missing email or password" });
    }

    const player = await allPlayers(email);
    if (!player) return res.status(404).json({ message: "player not found" });

    const match = await bcrypt.compare(password, player.pass);
    if (!match) return res.status(401).json({ message: "wrong password" });

    const token = jwt.sign({ _id: player._id, fName: player.fName }, SECRET, {
        expiresIn: "1h",
    });

    return res.status(200).json({ message: "login successful", token });
}


export async function updatePlayer(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    
    const existingPlayer = await getPlayerById(id);
    if (!existingPlayer) {
        return res.status(404).json({ message: "player not found" });
    }
    
    if (updateData.pass) {
        const saltRounds = 10;
        updateData.pass = await bcrypt.hash(updateData.pass, saltRounds);
    }
    
    const updatedPlayer = await updatePlayerModel(id, updateData);
    return res.status(200).json({
        message: "player updated successfully",
        player: updatedPlayer,
    });
}

export async function deletePlayer(req, res) {
    const { email } = req.params;

    let players = await allPlayers();
    let index = players.findIndex((p) => p.email === email);

    if (index === -1) {
        return res.status(404).json({ message: "player not found" });
    }

    players.splice(index, 1);

    await writeFile(filePath, JSON.stringify(players, null, 2));

    return res.status(200).json({ message: "player deleted successfully" });
}
