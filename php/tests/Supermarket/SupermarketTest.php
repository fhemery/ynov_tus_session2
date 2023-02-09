<?php

declare(strict_types=1);

namespace Supermarket;

use PHPUnit\Framework\TestCase;
use Supermarket\Model\{Product, ProductUnit, ShoppingCart, SpecialOfferType, SupermarketCatalog, Teller};

class SupermarketTest extends TestCase
{
    private SupermarketCatalog $catalog;
    private Product $toothbrush;
    private Product $apples;
    private ShoppingCart $cart;
    private Teller $teller;

    public function setUp() : void {
        $this->catalog = new FakeCatalog();
        $this->toothbrush = new Product('toothbrush', ProductUnit::EACH());

        $this->catalog->addProduct($this->toothbrush, 0.99);
        $this->apples = new Product('apples', ProductUnit::KILO());
        $this->catalog->addProduct($this->apples, 1.99);

        $this->cart = new ShoppingCart();
        $this->teller = new Teller($this->catalog);
    }

    public function testNormalBasketWithKgs(): void
    {
        // Arrange
        $this->cart->addItemQuantity($this->apples, 2.5);

        $teller = new Teller($this->catalog);
        $teller->addSpecialOffer(SpecialOfferType::TEN_PERCENT_DISCOUNT(), $this->toothbrush, 10.0);

        // Act
        $receipt = $this->teller->checkoutArticlesFrom($this->cart);

        // Assert
        self::assertSame(4.975, $receipt->getTotalPrice());
        self::assertSame([], $receipt->getDiscounts());
        self::assertCount(1, $receipt->getItems());
        $receiptItem = $receipt->getItems()[0];
        self::assertSame($this->apples, $receiptItem->getProduct());
        self::assertSame(1.99, $receiptItem->getPrice());
        self::assertSame(2.5 * 1.99, $receiptItem->getTotalPrice());
        self::assertSame(2.5, $receiptItem->getQuantity());
    }

    public function testTenPercentDiscount(): void {
        // Arrange
        $this->teller->addSpecialOffer(SpecialOfferType::TEN_PERCENT_DISCOUNT(), $this->toothbrush, 10.0);

        $this->cart->addItemQuantity($this->toothbrush, 2);

        // Act
        $receipt = $this->teller->checkoutArticlesFrom($this->cart);

        // Assert
        self::assertSame(0.99 * 0.90 * 2, $receipt->getTotalPrice());
        self::assertSame(1, count($receipt->getDiscounts()));
    }
}
