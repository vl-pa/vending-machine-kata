import { InventoryManager } from "./InventoryManager";
import { availableProducts } from "../constants/availableProduct";
import { Inventory } from "./Inventory";
import { ProductName } from './Product';

describe("InventoryManager", () => {

  const testInventory: Inventory[] = [
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
        price: 2
      },
      quantity: 0
    }
  ]
  const inventoryManager = new InventoryManager(testInventory);

  it("should return true if product is in stock", () => {
    expect(inventoryManager.productIsInStock(ProductName.cola)).toEqual(true);
  });

  it("should return false if product is out of stock", () => {
    expect(inventoryManager.productIsInStock(ProductName.chips)).toEqual(false);
  });
});
