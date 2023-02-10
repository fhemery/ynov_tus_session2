package org.kata.currency

import org.kata.currency.external.CurrencyIsoCode
import org.kata.currency.external.conversionRateApi.IConversionRateApi

class ConversionRateMockApi: IConversionRateApi {
    private val rates = HashMap<CurrencyIsoCode, HashMap<CurrencyIsoCode,Double>>()
    val calls = mutableListOf<GetRateParams>()

    fun addRate(source: CurrencyIsoCode, target: CurrencyIsoCode, value: Double) {
        if(!rates.containsKey(source)) {
            rates[source] = HashMap()
        }
        val sourceMap = rates[source]
        if (sourceMap != null)
            sourceMap[target] = value
    }

    override fun getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): Double {
        calls.add(GetRateParams(source, target))
        if (!rates.containsKey(source)) {
            throw RuntimeException("Source $source not found")
        }

        val sourceMap = rates[source]
        if(!sourceMap!!.containsKey(target)) {
            throw RuntimeException("Target $target not found for source $source")
        }
        return sourceMap[target]!!

    }
}

class GetRateParams (val source: CurrencyIsoCode, val target: CurrencyIsoCode)
