from src.game_of_life.game_of_life import GameOfLife


def test_empty_board_returns_empty_board():
    board = to_clean_board("""2 3
        ...
        ...
    """)
    game_of_life = GameOfLife(board)
    new_board = game_of_life.next_generation()

    assert board == new_board


def to_clean_board(board):
    return '\n'.join(map(str.strip , board.split("\n")))
def test_cell_with_less_than_two_neighbours_dies():
    board = to_clean_board("""2 3
        .*.
        ...
    """)

    expected_next_generation = to_clean_board("""2 3
            ...
            ...
        """)
    game_of_life = GameOfLife(board)
    new_board = game_of_life.next_generation()

    assert new_board == expected_next_generation


def assert_matches(actual, expected):
    errors = list()
    for i in range(0, len(actual)):
        if expected[i] == "?":
            continue
        if actual[i] != expected[i]:
            errors.append("Difference at character " + str(i) +", expected " + expected[i] + ", got " + actual[i])
    assert len(errors) == 0, "Errors when checking boards:\n"+ '\n'.join(errors)

def test_cell_with_more_than_three_neighbours_dies():
    board = to_clean_board("""2 3
        .**
        ***
    """)

    expected_next_generation = to_clean_board("""2 3
            ?.?
            ?.?
        """)
    game_of_life = GameOfLife(board)
    new_board = game_of_life.next_generation()

    assert_matches(new_board, expected_next_generation)

def test_cell_with_two_or_three_neighbors_survives():
    board = to_clean_board("""3 3
        .**
        .*.
        .*.
    """)

    expected_next_generation = to_clean_board("""3 3
            ?**
            ?*?
            ???
        """)

    game_of_life = GameOfLife(board)
    new_board = game_of_life.next_generation()

    assert_matches(new_board, expected_next_generation)