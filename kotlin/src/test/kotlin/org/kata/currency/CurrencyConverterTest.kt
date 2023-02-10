package org.kata.currency

import org.kata.currency.external.CurrencyIsoCode
import org.kata.currency.model.Currency
import org.kata.currency.model.Money
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class CurrencyConverterTest {
    @Test
    fun shouldWork() {
        Assertions.assertEquals(3, 1 + 2)
    }

    @Test
    fun `should return the conversion of the correct rate`() {
        val rateApi = ConversionRateMockApi()
        rateApi.addRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 2.0)

        val converter = CurrencyConverter(rateApi)

        val (amount, currency) = converter.sum(Currency.EURO, Money(1.0, Currency.DOLLAR))
        Assertions.assertEquals(2.0, amount)
        Assertions.assertEquals(currency, Currency.EURO)
    }

    @Test
    fun `should call the API only once if same rate is needed several times`() {
        val rateApi = ConversionRateMockApi()
        rateApi.addRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 2.0)
        rateApi.addRate(CurrencyIsoCode.EUR, CurrencyIsoCode.USD, 2.0)

        val converter = CurrencyConverter(rateApi)

        val (amount, currency) = converter.sum(Currency.EURO, Money(1.0, Currency.DOLLAR), Money(2.0, Currency.DOLLAR))
        Assertions.assertEquals(6.0, amount)
        Assertions.assertEquals(currency, Currency.EURO)
        Assertions.assertEquals(1, rateApi.calls.count())
        Assertions.assertEquals(CurrencyIsoCode.USD, rateApi.calls[0].source)
        Assertions.assertEquals(CurrencyIsoCode.EUR, rateApi.calls[0].target)
    }
}