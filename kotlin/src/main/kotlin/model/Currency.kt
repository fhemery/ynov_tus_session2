package model

import external.CurrencyIsoCode

enum class Currency {
    EURO, DOLLAR, POUND, YEN;

    fun toIsoCode(): CurrencyIsoCode {
        return when (this) {
            EURO -> CurrencyIsoCode.EUR
            DOLLAR -> CurrencyIsoCode.USD
            POUND -> CurrencyIsoCode.GBP
            YEN -> CurrencyIsoCode.JPY
        }
    }
}