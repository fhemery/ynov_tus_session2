<?php

namespace Supermarket;

use PHPUnit\Framework\TestCase;
use Supermarket\Model\Product;
use Supermarket\Model\ProductUnit;
use Supermarket\Model\Receipt;
use Supermarket\ReceiptPrinter;

class ReceiptPrinterTest extends TestCase
{
    private ReceiptPrinter $receiptPrinter;

    public function setUp(): void
    {
        parent::setUp();
        $this->receiptPrinter = new ReceiptPrinter();
    }

    public function testReturnsEmptyForEmptyReceipt() {
        // ARRANGE
        $receipt = new Receipt();

        // ACT
        $result = $this->receiptPrinter->printReceipt($receipt);

        // ASSERT
        $expected = $this->cleanLineBreaks("
Total:                              0.00");
        self::assertSame($expected, $result);
    }

    public function testReturnsOneProductForSimpleProduct() {
        //ARRANGE
        $receipt = new Receipt();
        $receipt->addProduct(new Product('Toothbrush', ProductUnit::EACH()), 2, 0.99, 1.98);

        // ACT
        $result = $this->receiptPrinter->printReceipt($receipt);

        // ASSERT
        $expected = $this->cleanLineBreaks("Toothbrush                          1.98
  0.99 * 2

Total:                              1.98");

        self::assertSame($expected, $result);
    }

    private function cleanLineBreaks(string $string): string
    {
        return str_replace("\r", "", $string);
    }
}
