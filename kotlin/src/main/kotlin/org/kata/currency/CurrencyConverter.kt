package org.kata.currency

import org.kata.currency.external.conversionRateApi.IConversionRateApi
import org.kata.currency.model.Currency
import org.kata.currency.model.Money
import java.util.*

class CurrencyConverter(private val rateApi: IConversionRateApi) {
    fun sum(target: Currency, vararg moneys: Money): Money {
        // We are paying each call we make to the API, so better not make useless calls
        var amount = 0.0
        val knownRates = HashMap<Currency, Double>()
        knownRates[target] = 1.0
        for (m in moneys) {
            if (!knownRates.containsKey(m.currency)) {
                knownRates[m.currency] = rateApi.getRate(m.currency.toIsoCode(), target.toIsoCode())
            }
            amount += m.amount * knownRates[m.currency]!!
        }
        return Money(amount, target)
    }
}