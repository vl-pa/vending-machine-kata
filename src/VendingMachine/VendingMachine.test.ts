import { Inventory } from "../Inventory/Inventory";
import { ProductName } from "../Inventory/Product";
import { InventoryManager } from "../Inventory/InventoryManager";
import { CoinAcceptor } from "../Coin/CoinAcceptor";
import { acceptedCoins } from "../constants/knownCoins";
import { VendingMachine, DisplayMessage } from "./VendingMachine";
import { CoinSpecification } from "../Coin/CoinSpecification";

describe("VendingMachine", () => {

  let nickelSpec: CoinSpecification;
  let dimeSpec: CoinSpecification;
  let quarterSpec: CoinSpecification;
  let testInventory: Inventory[];
  let inventoryManager: InventoryManager;
  let cointAcceptor: CoinAcceptor;
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    nickelSpec = {
      diameter: 21.21,
      thickness: 1.95,
      weight: 5
    };
  
    dimeSpec = {
      diameter: 17.91,
      thickness: 1.35,
      weight: 2.268
    };
  
    quarterSpec = {
      diameter: 24.26,
      thickness: 1.75,
      weight: 5.670
    };
  
    testInventory = [
      {
        product: {
          name: ProductName.cola,
          price: 1
        },
        quantity: 10
      },
      {
        product: {
          name: ProductName.chips,
          price: 0.5
        },
        quantity: 0
      },
      {
        product: {
          name: ProductName.candy,
          price: 0.5
        },
        quantity: 10
      }
    ]
    inventoryManager = new InventoryManager(testInventory);
    cointAcceptor = new CoinAcceptor(acceptedCoins);
    vendingMachine = new VendingMachine(cointAcceptor, inventoryManager);
  });
  
  it("should display INSERT COIN when no coins inserted", () => {
    expect(vendingMachine.displayMessage).toEqual(DisplayMessage.insertCoin);
  });

  it("should update balance when nickel is inserted", () => {
    vendingMachine.acceptCoin(nickelSpec);
    expect(vendingMachine.displayMessage).toEqual('0.05');
  });

  it("should update balance when more than one coin is inserted", () => {
    vendingMachine.acceptCoin(nickelSpec);
    vendingMachine.acceptCoin(quarterSpec);
    expect(vendingMachine.displayMessage).toEqual('0.3');
  });
});
