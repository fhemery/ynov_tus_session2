def to_coord(x, y):
    return str(x) +";" + str(y)


class Board:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.alive_cells = dict()

    def set_alive_at(self, x, y):
        self.alive_cells[to_coord(x, y)] = True

    def set_dead_at(self, x, y):
        self.alive_cells.pop(to_coord(x, y))

    def is_alive(self, x, y):
        return to_coord(x, y) in self.alive_cells

    def clone(self):
        new_board = Board(self.rows, self.cols)
        new_board.alive_cells = self.alive_cells.copy()
        return new_board

class GameOfLife:
    def __init__(self, board):
        self.aliveCells = dict()
        self.rows = 0
        self.cols = 0

        self.board = self.read_board(board)

    def read_board(self, board):
        lines = str.split(board, "\n")
        header = lines[0].split(' ')
        rows = int(header[0])
        cols = int(header[1])

        board = Board(rows,cols)
        for i in range(0, rows):
            for j in range(0, cols):
                if lines[i+1][j] == "*":
                    board.set_alive_at(i, j)
        return board

    def next_generation(self):
        next_gen_board = self.board.clone()

        for cell in self.board.alive_cells:
            coordinates = cell.split(";")
            neighbors = self.get_neighbors(int(coordinates[0]), int(coordinates[1]), self.board)


            if neighbors < 2 or neighbors > 3:
                next_gen_board.set_dead_at(int(coordinates[0]), int(coordinates[1]))

        self.board = next_gen_board
        result = self.write_board()
        return result

    def write_board(self):
        result = str(self.board.rows) + " " + str(self.board.cols) + "\n"
        for i in range(0, self.board.rows):
            for j in range(0, self.board.cols):
                if self.board.is_alive(i, j):
                    result += "*"
                else:
                    result += "."
            result += "\n"
        return result

    def get_neighbors(self, x, y, board):
        neighbors = 0
        if board.is_alive(x+1, y+1):
            neighbors+=1
        if board.is_alive(x+1, y):
            neighbors+=1
        if board.is_alive(x+1, y-1):
            neighbors+=1
        if board.is_alive(x, y+1):
            neighbors += 1
        if board.is_alive(x, y-1):
            neighbors+=1
        if board.is_alive(x-1, y+1):
            neighbors+=1
        if board.is_alive(x-1, y):
            neighbors+=1
        if board.is_alive(x-1, y-1):
            neighbors+=1
        return neighbors
