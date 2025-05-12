import fs from "fs/promises";
import { __dirname, __filename } from "./global.js";
import { Player } from "./Services/Players/player.model.js";

import * as mong from "mongodb";
import bcrypt from "bcryptjs";

export async function CreateDB() {
  const path = `./DB_Players.JSON`;

  const firstNames = [
    "Avigail",
    "Yitzhak",
    "Rivka",
    "Moshe",
    "Sarah",
    "David",
    "Leah",
    "Shmuel",
    "Esther",
    "Yonatan",
  ];
  const lastNames = [
    "Cohen",
    "Levi",
    "Mizrahi",
    "Friedman",
    "Weiss",
    "Ben-David",
    "Grossman",
    "Katz",
    "Goldberg",
    "Peretz",
  ];
  const lastE = ["gmail.com", "google.com", "ruppin.com"];

  let playersArray = [];

  for (let i = 1; i <= 100; i++) {
    let fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    let lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    let email = `${fName}${lName}@${
      lastE[Math.floor(Math.random() * lastE.length)]
    }`;

    let buyIn = Math.floor(Math.random() * 1000) + 1;
    let buyOut = Math.floor(Math.random() * 1000) + 1;

    let pass = bcrypt.hashSync(`${fName}_${i}`, 10);

    let player = new Player(i, email, pass, fName, lName, buyIn, buyOut);
    playersArray.push(JSON.parse(player.toString()));
  }

  const fullDB = {
    Players: playersArray,
  };

  try {
    await fs.writeFile(path, JSON.stringify(fullDB, null, 2), "utf-8");
    console.log(`DB created with ${playersArray.length} players`);
  } catch (err) {
    console.log(err);
  }
}

export async function CreatePokerMateMongo() {
  // db = db.getSiblingDB("PokerMate");

  // // db.Players.drop();

  // db.createCollection("Players");

  for (let i = 0; i < 100; i++) {
    const firstNames = [
      "Avigail",
      "Yitzhak",
      "Rivka",
      "Moshe",
      "Sarah",
      "David",
      "Leah",
      "Shmuel",
      "Esther",
      "Yonatan",
    ];
    const lastNames = [
      "Cohen",
      "Levi",
      "Mizrahi",
      "Friedman",
      "Weiss",
      "Ben-David",
      "Grossman",
      "Katz",
      "Goldberg",
      "Peretz",
    ];
    const lastE = ["gmail.com", "google.com", "ruppin.com"];

    for (let i = 1; i <= 100; i++) {
      let fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      let lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      let email = `${fName}${lName}@${
        lastE[Math.floor(Math.random() * lastE.length)]
      }`;

      let buyIn = Math.floor(Math.random() * 1000) + 1;
      let buyOut = Math.floor(Math.random() * 1000) + 1;

      let pass = bcrypt.hashSync(`${fName}_${i}`, 10);

      let player = new Player(i, email, pass, fName, lName, buyIn, buyOut);

      let client = null;
      try {
        client = await mong.MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        await db.collection(process.env.COLLECTION_NAME).insertOne(player);
      } catch (error) {
        console.error("Error!");
        throw error;
      } finally {
        if (client) client.close();
      }
    }
  }
}
