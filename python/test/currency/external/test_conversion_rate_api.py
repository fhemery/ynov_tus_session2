import pytest

from src.currency.external.conversion_rate_api import ConversionRateApi
from src.currency.external.currency_iso_code import CurrencyIsoCode


def test_conversion_rate_api_throws_exception():
    with pytest.raises(Exception):
        ConversionRateApi().get_rate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR)