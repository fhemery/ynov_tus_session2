package org.kata.currency.external.conversionRateApi

import org.kata.currency.external.CurrencyIsoCode

interface IConversionRateApi {
    fun getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): Double
}