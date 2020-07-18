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
      quantity: 2
    }
  ]
  const inventoryManager = new InventoryManager(testInventory);

  it("should return true if product is in stock", () => {
    expect(inventoryManager.getProductStock(ProductName.cola)).toEqual(10);
  });

  it("should return false if product is out of stock", () => {
    expect(inventoryManager.getProductStock(ProductName.chips)).toEqual(2);
  });

  it("should subtract item from inventory", () => {
    expect(inventoryManager.getProductStock(ProductName.cola)).toEqual(10);
    inventoryManager.subtractFromInventory(ProductName.cola);
    expect(inventoryManager.getProductStock(ProductName.cola)).toEqual(9);
  });

  it("should not subtract item from inventory that hs not been selected", () => {
    expect(inventoryManager.getProductStock(ProductName.chips)).toEqual(2);
    inventoryManager.subtractFromInventory(ProductName.cola);
    expect(inventoryManager.getProductStock(ProductName.chips)).toEqual(2);
  });
});
