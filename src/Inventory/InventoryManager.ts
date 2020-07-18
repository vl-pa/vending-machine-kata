import { Product, ProductName } from "./Product";
import { Inventory } from "./Inventory";

interface IInventoryManager {
  getProductStock: (product: ProductName) => number;
  subtractFromInventory: (product: ProductName) => void;
  getProductPrice: (product: ProductName) => number;
}

export class InventoryManager implements IInventoryManager {
  private inventory: Inventory[];

  constructor(productsForSale: Inventory[]) {
    this.inventory = productsForSale;
  }

  private getInventoryItem(productName: ProductName): Inventory | undefined {
    return this.inventory.find(product => productName === product.product.name);
  }

  public getProductPrice(productName: ProductName) {
    const inventoryItem = this.getInventoryItem(productName);
    if (inventoryItem === undefined) {
      throw new Error('Cannot find product');
    }
    return inventoryItem.product.price;
  }

  public getProductStock(productName: ProductName) {
    const inventoryItem = this.getInventoryItem(productName);
    if (inventoryItem === undefined) {
      return 0;
    }
    return inventoryItem.quantity;
  }

  public subtractFromInventory(productName: ProductName) {
    const inventoryItem = this.getInventoryItem(productName);
    if (inventoryItem !== undefined) {
      this.inventory = this.inventory.map(x => {
        if (x.product.name === inventoryItem.product.name) {
          return {
            ...x,
            quantity: x.quantity - 1
          }
        }
        return x;
      });
    }
  }
}