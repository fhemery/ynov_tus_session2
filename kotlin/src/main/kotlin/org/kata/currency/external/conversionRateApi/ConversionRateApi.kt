package org.kata.currency.external.conversionRateApi

import org.kata.currency.external.CurrencyIsoCode

class ConversionRateApi : IConversionRateApi {
    override fun getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): Double {
        throw RuntimeException("401 - Unauthorized, IP not recognized. Are you trying to call us via a unit test?")
    }
}