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

  it("should display INSERT COIN when coins are returned", () => {
    vendingMachine.acceptCoin(quarterSpec);
    vendingMachine.returnCoins();
    expect(vendingMachine.displayMessage).toEqual(DisplayMessage.insertCoin);
  });

  it("should display SOLD OUT when selected product is out of stock", () => {
    vendingMachine.acceptCoin(quarterSpec);
    vendingMachine.acceptCoin(quarterSpec);
    vendingMachine.selectProduct(ProductName.chips);
    expect(vendingMachine.displayMessage).toEqual(`${DisplayMessage.soldOut} 0.5`);
  });

  it("should display PRICE and INSERT COIN when selected product costs more than been inserted", () => {
    vendingMachine.acceptCoin(quarterSpec);
    vendingMachine.acceptCoin(quarterSpec);
    vendingMachine.selectProduct(ProductName.cola);
    expect(vendingMachine.displayMessage).toEqual(`${DisplayMessage.price} 1 ${DisplayMessage.insertCoin}`);
  });

  it("should display THANK you when selected product is available and enough money was inserted", () => {
    vendingMachine.acceptCoin(quarterSpec);
    vendingMachine.acceptCoin(quarterSpec);
    vendingMachine.acceptCoin(quarterSpec);
    vendingMachine.acceptCoin(quarterSpec);
    vendingMachine.selectProduct(ProductName.cola);
    expect(vendingMachine.displayMessage).toEqual(DisplayMessage.thankYou);
  });

  it("should display EXACT CHANGE ONLY when no change available", () => {
    vendingMachine.setNoChange();
    expect(vendingMachine.displayMessage).toEqual(DisplayMessage.exactChangeOnly);
  });

});
