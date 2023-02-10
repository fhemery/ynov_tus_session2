package external.conversionRateApi

import external.CurrencyIsoCode

interface IConversionRateApi {
    fun getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): Double
}