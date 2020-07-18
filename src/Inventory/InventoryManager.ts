import { Product, ProductName } from "./Product";
import { Inventory } from "./Inventory";

interface IInventoryManager {
  getProductStock: (product: ProductName) => number;
  subtractFromInventory: (Product: ProductName) => void;
}

export class InventoryManager implements IInventoryManager {
  private inventory: Inventory[];

  constructor(productsForSale: Inventory[]) {
    this.inventory = productsForSale;
  }

  private getInventoryItem(productName: ProductName): Inventory | undefined {
    return this.inventory.find(product => productName === product.product.name);
  }

  public getProductStock(productName: ProductName) {
    const product = this.getInventoryItem(productName);
    if (product === undefined) {
      return 0;
    }
    return product.quantity;
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