from src.currency.external.currency_iso_code import CurrencyIsoCode


class ConversionRateApi:

    def get_rate(self, source: CurrencyIsoCode, target: CurrencyIsoCode):
        print("Getting rate from " + source.value + " to " + target.value)
        raise Exception("401 - Unauthorized, IP not recognized. Are you trying to call us via a unit test?")
