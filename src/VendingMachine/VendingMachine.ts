import { Product } from "../Inventory/Product";
import { CoinAcceptor } from "../Coin/CoinAcceptor";
import { InventoryManager } from "../Inventory/InventoryManager";
import { CoinSpecification } from "../Coin/CoinSpecification";

interface IVendingMachine {
  selectProduct: (product: Product) => void;
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
  private _displayMessage = 'INSERT COIN';

  private setDisplayMessage(message: string) {
    this._displayMessage = message;
  }

  public get displayMessage(): string {
    return this._displayMessage;
  }

  constructor(coinAcceptor: CoinAcceptor, inventoryManager: InventoryManager) {
    this.coinAcceptor = coinAcceptor;
    this.inventoryManager = inventoryManager;
  };

  public acceptCoin (coinSpec: CoinSpecification) {
    this.balance+= this.coinAcceptor.getCoinValue(coinSpec);
    this.setDisplayMessage(`${this.balance}`);
  }

  public returnCoins () {

  }

  public selectProduct (product: Product) {

  }

  public displayInsertCoin (message: string){

  }

}