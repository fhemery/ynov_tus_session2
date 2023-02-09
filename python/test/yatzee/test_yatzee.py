from src.yatzee.yatzee import Yatzy


# These unit tests can be run using the py.test framework
# available from http://pytest.org/

def test_ones():
    assert Yatzy.ones(1, 2, 3, 1, 4) == 2


class TestYatzy:

    # BeforeAll
    def setup_class(self):
        pass

    # BeforeEach
    def setup(self):
        self.yatzy = Yatzy(4, 5, 6, 1, 4)

    # AfterEach
    def teardown(self):
        pass

    # AfterAll
    def teardown_class(self):
        pass

    def test_fours(self):
        assert self.yatzy.fours() == 8

    def test_fives(self):
        assert self.yatzy.fives() == 5
