import { GildedRose, Item } from "./gilded-rose";

function updateItem(item: Item): Item {
  const items = [item];

  const gildedRose = new GildedRose(items);

  gildedRose.updateQuality();

  expect(items).toHaveLength(1);
  return items[0];
}

describe("Gilded rose", function() {
  describe("when there is no item", function() {
    it("should change nothing", function() {
      const gildedRose = new GildedRose();

      gildedRose.updateQuality();

      expect(gildedRose.items).toEqual([]);
    });
  });

  describe("Normal Items", () => {
    const normalItem = "A hammer";
    it("should decrease sellIn", function() {
      const item = updateItem(new Item(normalItem, 10, 20));
      expect(item.sellIn).toBe(9);
    });

    it("should decrease quality", function() {
      const item = updateItem(new Item(normalItem, 10, 20));
      expect(item.quality).toBe(19);
    });

    it("should not further decrease quality when item quality is 0", function() {
      const item = updateItem(new Item(normalItem, 10, 0));
      expect(item.quality).toBe(0);
    });

    it("should not further decrease quality when item quality is below 0", function() {
      const item = updateItem(new Item(normalItem, 10, -2));
      expect(item.quality).toBe(-2);
    });

    it("should keep decreasing sellIn when item sellIn is 0", function() {
      const item = updateItem(new Item(normalItem, 0, 10));
      expect(item.sellIn).toBe(-1);
    });

    it("should decrease sellIn quality twice as fast when item sellIn is 0 or below", function() {
      const item = updateItem(new Item(normalItem, 0, 10));
      expect(item.quality).toBe(8);
    });

    it("should not decrease sellIn quality below 0 even when item sellIn is 0 or below", function() {
      const item = updateItem(new Item(normalItem, 0, 1));
      expect(item.quality).toBe(0);
    });
  });

  describe("when item is sulfuras", function() {
    const sulfurasItem = "Sulfuras, Hand of Ragnaros";

    it("should not decrease quality", function() {
      const item = updateItem(new Item(sulfurasItem, 1, 10));
      expect(item.quality).toBe(10)
    });

    it("should not decrease sellIn", function() {
      const item = updateItem(new Item(sulfurasItem, 1, 10));
      expect(item.sellIn).toBe(1)
    });

    it("should not decrease sellIn even if sell in is passed", function() {
      const item = updateItem(new Item(sulfurasItem, -1, 10));
      expect(item.quality).toBe(10)
    });

    xit("should always return 80 for quality", function() {
      const item = updateItem(new Item(sulfurasItem, 1, 10));
      expect(item.quality).toBe(80)
    });
  });

  describe("when item is Aged brie", function() {
    const agedBrie = 'Aged Brie';
    it("should increase quality when sellIn is above 0", function() {
      const item = updateItem(new Item(agedBrie, 1, 10));
      expect(item.quality).toBe(11)
    });

    it("should decrease sellIn anytime", function() {
      const item = updateItem(new Item(agedBrie, 1, 10));
      expect(item.sellIn).toBe(0)
    });

    it("should increase quality faster when sellIn is 0 or below", function() {
      const item = updateItem(new Item(agedBrie, 0, 10));
      expect(item.quality).toBe(12)
    });

    it("should never increase quality above 50", function() {
      const item = updateItem(new Item(agedBrie, 0, 50));
      expect(item.quality).toBe(50)
    });

  });

  describe("when item is Conjured", function() {
    const conjured = "Conjured";
    it('should decrease sellIn by one', () => {
      const item = updateItem(new Item(conjured, 10, 15));
      expect(item.sellIn).toBe(9);
    })

    it('should decay twice as fast', () => {
      const item = updateItem(new Item(conjured, 10, 15));
      expect(item.quality).toBe(13);
    })

    it("should not further decrease quality when item quality is 0", function() {
      const item = updateItem(new Item(conjured, 10, 0));
      expect(item.quality).toBe(0);
    });

    it("should not further decrease quality when item quality is below 0", function() {
      const item = updateItem(new Item(conjured, 10, -2));
      expect(item.quality).toBe(-2);
    });

    it("should decrease sellIn quality twice as fast when item sellIn is 0 or below", function() {
      const item = updateItem(new Item(conjured, 0, 10));
      expect(item.quality).toBe(6);
    });
  });

  describe("when item is Backstage passes to a TAFKAL80ETC concert", function() {
    const backStagePass="Backstage passes to a TAFKAL80ETC concert";

    it("should decrease SellIn as for a normal item", function() {
      const item = updateItem(new Item(backStagePass, 10, 15));
      expect(item.sellIn).toBe(9);
    });

    it("should increase quality by 1 when there are more than 10 days left", function() {
      const item = updateItem(new Item(backStagePass, 11, 15));
      expect(item.quality).toBe(16);
    });

    it("should never increase quality above 50", function() {
      const item = updateItem(new Item(backStagePass, 11, 50));
      expect(item.quality).toBe(50)
    });

    it("should increase quality by 2 when there are less than 10 days left ", function() {
      const item = updateItem(new Item(backStagePass, 10, 15));
      expect(item.quality).toBe(17);
    });

    it("should increase quality by 2 until 6 days left", function() {
      const item = updateItem(new Item(backStagePass, 6, 15));
      expect(item.quality).toBe(17);
    });

    it("should never increase quality over 50 when concert gets near (<=10 days)", function() {
      const item = updateItem(new Item(backStagePass, 7, 49));
      expect(item.quality).toBe(50)
    });

    it("should increase quality by 3 when there are less than 5 days left", function() {
      const item = updateItem(new Item(backStagePass, 5, 15));
      expect(item.quality).toBe(18);
    });

    it("should never increase quality over 50 when concert gets near (<=5 days)", function() {
      const item = updateItem(new Item(backStagePass, 1, 48));
      expect(item.quality).toBe(50)
    });

    it("should drop quality when sell becomes less than 0", function() {
      const item = updateItem(new Item(backStagePass, 0, 15));
      expect(item.quality).toBe(0);
    });
  });
});