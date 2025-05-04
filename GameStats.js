export class GameStats {
  constructor(buyInAmount, buyOutAmount) {
    this.buyInAmount = buyInAmount;
    this.buyOutAmount = buyOutAmount;
    this.gainOrLoss = buyOutAmount - buyInAmount;
  }


  toString() {
    return JSON.stringify({
      buyInAmount: this.buyInAmount,
      buyOutAmount: this.buyOutAmount,
      gainOrLoss: this.gainOrLoss,
    });
  }
}
