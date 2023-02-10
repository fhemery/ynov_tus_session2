from src.currency.currency import Currency
from src.currency.external.conversion_rate_api import ConversionRateApi
from src.currency.money import Money


class CurrencyConverter:
    def __init__(self, rate_api: ConversionRateApi):
        self.rate_api = rate_api

    def sum(self, target: Currency, *moneys: Money):
        amount = 0.0

        known_rates = {target: 1.0}

        for money in moneys:
            if money.currency not in known_rates:
                known_rates[money.currency] = self.rate_api.get_rate(money.currency.to_iso_code(), target.to_iso_code())
            amount += money.amount * known_rates[money.currency]

        return Money(amount, target)
