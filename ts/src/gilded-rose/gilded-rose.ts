export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum SpecificItems {
  AgedBrie = "Aged Brie",
  BackstagePass = "Backstage passes to a TAFKAL80ETC concert",
  Sulfuras = "Sulfuras, Hand of Ragnaros",
  Conjured = "Conjured",
}

const ITEM_MAX_QUALITY = 50;

interface ItemUpdater {
  updateSellIn(item: Item): void;

  updateQuality(item: Item): void;
}

class SulfurasItemUpdater implements ItemUpdater {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateQuality(): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateSellIn(): void {
  }
}

class DefaultItemUpdater implements ItemUpdater {
  updateQuality(item: Item): void {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }

    if (item.sellIn < 0) {
      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
    }
  }

  updateSellIn(item: Item): void {
    item.sellIn = item.sellIn - 1;
  }

}

class ConjuredItemUpdater implements ItemUpdater {
  updateQuality(item: Item): void {
    if (item.quality < 0) {
      return;
    }
    item.quality -=2;

    if(item.sellIn < 0) {
      item.quality -=2;
    }

    item.quality = Math.max(item.quality, 0);
  }

  updateSellIn(item: Item): void {
    item.sellIn -= 1;
  }

}

class AgedBrieItemUpdater implements ItemUpdater {
  updateQuality(item: Item): void {
    if (item.quality < ITEM_MAX_QUALITY) {
      item.quality = item.quality + 1;
    }
    if (item.sellIn < 0) {
      if (item.quality < ITEM_MAX_QUALITY) {
        item.quality = item.quality + 1;
      }
    }
  }

  updateSellIn(item: Item): void {
    item.sellIn = item.sellIn - 1;
  }
}

class BackstagePassUpdater implements ItemUpdater {
  updateQuality(item: Item): void {
    if (item.quality < ITEM_MAX_QUALITY) {
      item.quality = item.quality + 1;
      if (item.sellIn < 10) {
        if (item.quality < ITEM_MAX_QUALITY) {
          item.quality = item.quality + 1;
        }
      }
      if (item.sellIn < 5) {
        if (item.quality < ITEM_MAX_QUALITY) {
          item.quality = item.quality + 1;
        }
      }
    }

    if (item.sellIn < 0) {
      item.quality = item.quality - item.quality;
    }
  }

  updateSellIn(item: Item): void {
    item.sellIn = item.sellIn - 1;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      let updater: ItemUpdater | null = null;
      switch (item.name) {
        case SpecificItems.Sulfuras:
          updater = new SulfurasItemUpdater();
          break;
        case SpecificItems.AgedBrie:
          updater = new AgedBrieItemUpdater();
          break;
        case SpecificItems.BackstagePass:
          updater = new BackstagePassUpdater();
          break;
        case SpecificItems.Conjured:
          updater = new ConjuredItemUpdater();
          break;
        default:
          updater = new DefaultItemUpdater();
          break;
      }

      updater.updateSellIn(item);
      updater.updateQuality(item);
    }

    return this.items;
  }
}
