import { Product, ProductName } from "./Product";
import { Inventory } from "./Inventory";

interface IInventoryManager {
  productIsInStock: (product: ProductName) => boolean;
  subtractFromInventory: (Product: ProductName) => void;
}

export class InventoryManager implements IInventoryManager {
 private availableProducts: Inventory[];

 constructor(productsForSale: Inventory[]) {
   this.availableProducts = productsForSale;
 }

 public productIsInStock(productName: ProductName) {
   const product = this.availableProducts.find(product => productName === product.product.name);
   if (product === undefined) {
     return false;
   } 
   return product.quantity > 0 ? true : false;
 }

 public subtractFromInventory() {
   
 }
}