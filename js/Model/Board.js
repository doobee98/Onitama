class Board {
    constructor() {
        this.board = [];

        for (let i = 0; i < Board.BoardRow; i += 1) {
            this.board[i] = [];
            for (let j = 0; j < Board.BoardColumn; j += 1) {
                this.board[i][j] = Board.PieceStatus.empty;
            }
        }
        this.setPiece(-2, 2, Board.PieceStatus.blackPawn);
        this.setPiece(-1, 2, Board.PieceStatus.blackPawn);
        this.setPiece(0, 2, Board.PieceStatus.blackKing);
        this.setPiece(1, 2, Board.PieceStatus.blackPawn);
        this.setPiece(2, 2, Board.PieceStatus.blackPawn);
        this.setPiece(-2, -2, Board.PieceStatus.whitePawn);
        this.setPiece(-1, -2, Board.PieceStatus.whitePawn);
        this.setPiece(0, -2, Board.PieceStatus.whiteKing);
        this.setPiece(1, -2, Board.PieceStatus.whitePawn);
        this.setPiece(2, -2, Board.PieceStatus.whitePawn);
    }

    static getPos(row, column) {
        return [row - 2, 2 - column];
    }

    static getIndex(x, y) {
        return [2 + x, 2 - y];
    }

    static isValidPos(x, y) {
        return Math.abs(x) <= 2 && Math.abs(y) <= 2;
    }

    static isValidIndex(row, column) {
        return row >= 0 && row < Board.BoardRow && column >= 0 && column < Board.BoardColumn;
    }

    getPiece(x, y) {
        const [row, column] = Board.getIndex(x, y);
        return this.board[row][column];
    }

    setPiece(x, y, value) {
        const [row, column] = Board.getIndex(x, y);
        this.board[row][column] = value;
    }

    isEmptyCell(x, y) {
        return this.getPiece(x, y) === Board.PieceStatus.empty;
    }

    removePiece(x, y) {
        if (this.isEmptyCell(x, y)) {
            throw new Error(`(${x}, ${y}) 게임 말 삭제 시도: 셀이 비어있습니다.`);
        } else {
            this.setPiece(x, y, Board.PieceStatus.empty);
        }
    }

    movePiece(from, to) {
        const [fromX, fromY] = from;
        const [toX, toY] = to;
        this.setPiece(toX, toY, this.getPiece(fromX, fromY));
        this.removePiece(fromX, fromY);
    }
}
Board.BoardRow = 5;
Board.BoardColumn = 5;
Board.PieceStatus = {
    empty: '',
    whitePawn: 'whitePawn',
    whiteKing: 'whiteKing',
    blackPawn: 'blackPawn',
    blackKing: 'blackKing',
};

export default Board;
