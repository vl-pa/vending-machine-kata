import { InventoryManager } from "./InventoryManager";
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
        price: 0.5
      },
      quantity: 2
    }
  ]
  const inventoryManager = new InventoryManager(testInventory);

  it("should return the correct number of cola", () => {
    expect(inventoryManager.getProductStock(ProductName.cola)).toEqual(10);
  });

  it("should return the correct number of chips", () => {
    expect(inventoryManager.getProductStock(ProductName.chips)).toEqual(2);
  });

  it("should subtract item from inventory", () => {
    expect(inventoryManager.getProductStock(ProductName.cola)).toEqual(10);
    inventoryManager.subtractFromInventory(ProductName.cola);
    expect(inventoryManager.getProductStock(ProductName.cola)).toEqual(9);
  });

  it("should not subtract item from inventory that has not been selected", () => {
    expect(inventoryManager.getProductStock(ProductName.chips)).toEqual(2);
    inventoryManager.subtractFromInventory(ProductName.cola);
    expect(inventoryManager.getProductStock(ProductName.chips)).toEqual(2);
  });

  it("should not subtract item from inventory that has not been selected", () => {
    expect(inventoryManager.getProductPrice(ProductName.chips)).toEqual(0.5);
  });
});
