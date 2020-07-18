import { CoinAcceptor } from "./CoinAcceptor";
import { acceptedCoins } from "../constants/knownCoins";
import { CoinSpecification } from "./CoinSpecification";

describe("CoinAcceptor", () => {

  const cointAcceptor = new CoinAcceptor(acceptedCoins);

  it("should return 0 for unknown coin", () => {
    const pennySpec: CoinSpecification = {
      diameter: 19.05 ,
      thickness: 1.52,
      weight: 2.50
    };
    expect(cointAcceptor.getCoinValue(pennySpec)).toEqual(0);
  });

  it("should correctly identify nickel", () => {
    const nickelSpec: CoinSpecification = {
      diameter: 21.21,
      thickness: 1.95,
      weight: 5
    };
    expect(cointAcceptor.getCoinValue(nickelSpec)).toEqual(0.05);
  });

  it("should correctly identify dime", () => {
    const dimeSpec: CoinSpecification = {
      diameter: 17.91,
      thickness: 1.35,
      weight: 2.268
    }
    expect(cointAcceptor.getCoinValue(dimeSpec)).toEqual(0.1);
  });

  it("should correctly identify quarter", () => {
    const quarterSpec: CoinSpecification = {
      diameter: 24.26,
      thickness: 1.75,
      weight: 5.670
    }
    expect(cointAcceptor.getCoinValue(quarterSpec)).toEqual(0.25);
  });
});
