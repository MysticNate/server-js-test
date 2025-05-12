import fs from "fs/promises";
import path from "path";
import { __dirname, __filename } from "../../global.js";
import bcrypt from "bcryptjs";
import * as mong from "mongodb";
import "dotenv/config"; // Sets the .env file

export async function findAllPlayers() {
  let client = null;
  try {
    client = await mong.MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection(process.env.COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    console.error("Error!");
    throw error;
  } finally {
    if (client) client.close();
  }
}
// export async function findAllPlayers() {
//   let players = await fs.readFile(
//     path.join(__dirname, "DB_Players.JSON"),
//     "utf-8"
//   );
//   return JSON.parse(players);
// }

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
// No need for a Mongo Version :)

export async function findPlayerByEmail(email) {
  let client = null;
  try {
    client = await mong.MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    let collection = await db
      .collection(process.env.COLLECTION_NAME)
      .find({})
      .toArray();
    let player = collection.find((p) => p.email == email);
    return player;
  } catch (error) {
    console.error("Error!");
    throw error;
  } finally {
    if (client) client.close();
  }
}
// export async function findPlayerByEmail(email) {
//   let players = await fs.readFile(
//     path.join(__dirname, "DB_Players.JSON"),
//     "utf-8"
//   );
//   players = JSON.parse(players);

//   let player = players.Players.find((p) => p.email == email);
//   return player;
// }

export async function findSpecificPlayer(_id) {
  let client = null;
  try {
    client = await mong.MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    let collection = await db
      .collection(process.env.COLLECTION_NAME)
      .find({})
      .toArray();
    let player = collection.find((p) => p._id == _id);
    return player;
  } catch (error) {
    console.error("Error!");
    throw error;
  } finally {
    if (client) client.close();
  }
}
// export async function findSpecificPlayer(id) {
//   let players = await fs.readFile(
//     path.join(__dirname, "DB_Players.JSON"),
//     "utf-8"
//   );
//   players = JSON.parse(players);

//   let player = players.Players.find((p) => p._id == id);
//   return player;
// }

export async function AddPlayerToDB(player) {
  let client = null;
  try {
    client = await mong.MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    player.pass = bcrypt.hashSync(player.pass, 10);
    await db.collection(process.env.COLLECTION_NAME).insertOne(player);
  } catch (error) {
    console.error("Error!");
    throw error;
  } finally {
    if (client) client.close();
  }

  // Log the player
  delete player.pass;
  console.log(player);
}
// export async function AddPlayerToDB(player) {
//   const filePath = path.join(__dirname, "DB_Players.JSON");

//   // Read existing data
//   let data = await fs.readFile(filePath, "utf-8");
//   let json = JSON.parse(data);

//   player.pass = bcrypt.hashSync(player.pass, 10);

//   // Push new player (into "Player": ...)
//   json.Players.push(player);

//   // Log the player
//   delete player.pass;
//   console.log(player);

//   // Write back full JSON
//   await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");
// }

export async function DeletePlayerFromDB(_id) {
  let client = null;
  try {
    client = await mong.MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    let res = await db
      .collection(process.env.COLLECTION_NAME)
      .deleteOne({ _id:  _id  });

    console.log(res);
    return res.deletedCount > 0; // Return true if deleted, false if not found
    
  } catch (error) {
    console.error("Error!");
    throw error;
  } finally {
    if (client) client.close();
  }
}
// export async function DeletePlayerFromDB(id) {
//   const filePath = path.join(__dirname, "DB_Players.JSON");

//   // Read existing data
//   let data = await fs.readFile(filePath, "utf-8");
//   let json = JSON.parse(data);

//   const beforeCount = json.Players.length;
//   json.Players = json.Players.filter((p) => p._id !== id);
//   const afterCount = json.Players.length;

//   if (beforeCount === afterCount) {
//     return false; // Nothing was deleted
//   }

//   // Write updated data
//   await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");
//   return true;
// }

export async function UpdatePlayerInDB(_id, fName) {

  let client = null;
  console.log(fName);
  
  try {
    client = await mong.MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    let res = await db
      .collection(process.env.COLLECTION_NAME)
      .updateOne({ _id: _id }, { $set: { fName: fName } });

    console.log(res);
    return res.matchedCount > 0; // Return true if deleted, false if not found
  } catch (error) {
    console.error("Error!");
    throw error;
  } finally {
    if (client) client.close();
  }
}
