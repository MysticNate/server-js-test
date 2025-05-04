import * as playerMD from "./Services/Players/player.model.js";
import { GameStats } from "./GameStats.js";
import { ROLES } from "./Services/Players/player.roles.js";

export class Player {
  constructor(_id, email, pass, fName, lName, buyInAmount, buyOutAmount, role = ROLES.USER) {
    this._id = _id;
    this.email = email;
    this.pass = pass;
    this.fName = fName;
    this.lName = lName;

    this.GameStats = new GameStats(buyInAmount, buyOutAmount);

    this.role = role;

    // // Object for game stats
    // this.GameStats = [
    //   {
    //     buyInAmount: buyInAmount,
    //     buyOutAmount: buyOutAmount,
    //     gainOrLoss: buyOutAmount - buyInAmount,
    //   },
    // ];
  }

  static async GetAllPlayers() {
    return await playerMD.AllPlayers();
  }
  static async GetPlayersByID(id) {
    return await playerMD.AllPlayers(id);
  }
  async AddPlayer() {
    return await playerMD.AddPlayer(this);
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
}
