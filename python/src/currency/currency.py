from enum import Enum

from src.currency.external.currency_iso_code import CurrencyIsoCode


class Currency(Enum):
    Euro = 1
    Dollar = 2
    Pound = 3
    Yen = 4

    def to_iso_code(self):
        if self == Currency.Euro:
            return CurrencyIsoCode.EUR
        elif self == Currency.Dollar:
            return CurrencyIsoCode.USD
        elif self == Currency.Pound:
            return CurrencyIsoCode.GBP
        elif self == Currency.Yen:
            return CurrencyIsoCode.JPY
        raise "Unknown currency " + self.__str__()
