from unittest.mock import MagicMock

from src.currency.currency import Currency
from src.currency.currency_converter import CurrencyConverter
from src.currency.external.conversion_rate_api import ConversionRateApi
from src.currency.external.currency_iso_code import CurrencyIsoCode
from src.currency.money import Money


def test_converter():
    rate_api = ConversionRateApi()
    rate_api.get_rate = MagicMock(return_value=2)
    converter = CurrencyConverter(rate_api)

    result = converter.sum(Currency.Dollar, Money(1.0, Currency.Euro))

    assert result.amount == 2.0
    assert result.currency == Currency.Dollar


def test_when_twice_currency_does_not_call_api_twice():
    rate_api = ConversionRateApi()
    rate_api.get_rate = MagicMock(return_value=2)
    converter = CurrencyConverter(rate_api)

    result = converter.sum(Currency.Dollar, Money(1.0, Currency.Euro), Money(2.0, Currency.Euro))

    assert result.amount == 6.0
    assert rate_api.get_rate.call_count == 1
    rate_api.get_rate.assert_called_once_with(CurrencyIsoCode.EUR, CurrencyIsoCode.USD)


def test_when_two_currencies_owned():
    rate_api = ConversionRateApi()
    rate_api.get_rate = MagicMock(side_effect=[2, 0.01])
    converter = CurrencyConverter(rate_api)

    result = converter.sum(Currency.Dollar, Money(1.0, Currency.Euro), Money(200.0, Currency.Yen))

    assert result.amount == 4.0
