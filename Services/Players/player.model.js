import * as db from "./player.db.js";

import { GameStats } from "./GameStats.js";
import { ROLES } from "../Players/player.roles.js";

export class Player {
  constructor(
    _id,
    email,
    pass,
    fName,
    lName,
    buyInAmount,
    buyOutAmount,
    role = ROLES.USER
  ) {
    this._id = _id;
    this.email = email;
    this.pass = pass;
    this.fName = fName;
    this.lName = lName;

    this.GameStats = new GameStats(buyInAmount, buyOutAmount);

    this.role = role;
  }

  static async GetAllPlayers(id) {
    if (!id) return await db.findAllPlayers();

    // else
    return await db.findSpecificPlayer(id);
  }

  async AddPlayer() {
    let playerR = await db.AddPlayerToDB(this);
    if (playerR) {
      delete playerR.pass;
      return playerR;
    }
    return null;
  }

  static async DeletePlayerFromDB(id) {
    return await db.DeletePlayerFromDB(id);
  }

  static async UpdatePlayerInDB(id, newFName) {
    return await db.UpdatePlayerInDB(id, newFName);
  }

  static async playerLogin(email, pass) {
    return await db.playerLogin(email, pass);
  }

  toString() {
    return JSON.stringify({
      _id: this._id,
      email: this.email,
      pass: this.pass,
      fName: this.fName,
      lName: this.lName,
      GameStats: this.GameStats, // Just pass the object directly here
      role: this.role, // Just pass the object directly here
    });
  }

  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      pass: this.pass,
      fName: this.fName,
      lName: this.lName,
      GameStats: this.GameStats,
      role: this.role,
    };
  }
}
