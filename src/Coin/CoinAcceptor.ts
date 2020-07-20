import { CoinSpecification } from "./CoinSpecification";
import { Coin } from './Coin';

interface ICoinAcceptor {
  getCoinValue: (coinSpec: CoinSpecification) => number;
}

export class CoinAcceptor implements ICoinAcceptor {
  private knownCoins: Coin[];

  constructor(knownCoins: Coin[]) {
    this.knownCoins = knownCoins;
  }

  private identifyCoin(coinSpec: CoinSpecification): Coin | undefined {
    return this.knownCoins.find(coin => {
      return coin.specification.diameter === coinSpec.diameter
        && coin.specification.thickness === coinSpec.thickness
        && coin.specification.weight === coinSpec.weight;
    });
  }

  public getCoinValue(coinSpec: CoinSpecification): number {
    const coin = this.identifyCoin(coinSpec);
    if (coin === undefined) {
      return 0;
    }
    return coin.value;
  }
}
