import { Product, ProductName } from "../Inventory/Product";
import { CoinAcceptor } from "../Coin/CoinAcceptor";
import { InventoryManager } from "../Inventory/InventoryManager";
import { CoinSpecification } from "../Coin/CoinSpecification";

interface IVendingMachine {
  selectProduct: (product: ProductName) => void;
  acceptCoin: (coinSpec: CoinSpecification) => void;
  returnCoins: () => void;
  displayMessage: string;
}

export enum DisplayMessage {
  insertCoin = 'INSERT COIN',
  soldOut = 'SOLD OUT',
  thankYou = 'THANK YOU',
  price = 'PRICE '
}

export class VendingMachine implements IVendingMachine {
  private coinAcceptor: CoinAcceptor;
  private inventoryManager: InventoryManager;
  private balance: number = 0;
  private _displayMessage: string = DisplayMessage.insertCoin;
  
  constructor(coinAcceptor: CoinAcceptor, inventoryManager: InventoryManager) {
    this.coinAcceptor = coinAcceptor;
    this.inventoryManager = inventoryManager;
  };

  private setDisplayMessage(message: string) {
    this._displayMessage = message;
  }

  public get displayMessage(): string {
    return this._displayMessage;
  }

  public acceptCoin (coinSpec: CoinSpecification) {
    this.balance+= this.coinAcceptor.getCoinValue(coinSpec);
    this.setDisplayMessage(`${this.balance}`);
  }

  public returnCoins () {
    this.balance = 0;
    this.setDisplayMessage(DisplayMessage.insertCoin);
  }

  public selectProduct (product: ProductName) {
    const selectedProductPrice = this.inventoryManager.getProductPrice(product);

    if (this.inventoryManager.getProductStock(product) === 0) {
      this.setDisplayMessage(`${DisplayMessage.soldOut} ${this.balance}`);
      return;
    }
    else if (selectedProductPrice > this.balance) {
      this.setDisplayMessage(`${DisplayMessage.price} ${selectedProductPrice} ${DisplayMessage.insertCoin}`);
      return;
    }

    this.balance-=selectedProductPrice;
    this.inventoryManager.subtractFromInventory(product);
    this.setDisplayMessage(DisplayMessage.thankYou);
  }
}