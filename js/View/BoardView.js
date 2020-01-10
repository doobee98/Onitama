import BoardModel from '../Model/Board';


class BoardView {
    constructor() {
        this.$view = $('.board');
        this.$selectedPiece = null;
        this.highlightStatus = [[], [], [], [], []];

        for (let i = 0; i < BoardModel.BoardRow; i += 1) {
            this.highlightStatus[i] = [];
            for (let j = 0; j < BoardModel.BoardColumn; j += 1) {
                this.highlightStatus[i][j] = false;
            }
        }
    }

    $cell(x, y) {
        const [row, column] = BoardModel.getIndex(x, y);
        return this.$view.find('tr').eq(column)
            .find('td').eq(row);
    }

    $cellContent(x, y) {
        return this.$cell(x, y).children('.cellWrap');
    }

    cellPos($tableCell) {
        const $tr = $tableCell.closest('tr');
        const $td = $tableCell.closest('td');
        const column = this.$view.find('tr').index($tr);
        const row = $tr.find('td').index($td);
        return BoardModel.getPos(row, column);
    }

    hasPiece(x, y) {
        return this.$cell(x, y).find('.piece').length !== 0;
    }

    selectPiece(x, y) {
        const $piece = this.$cell(x, y).find('img');
        this.$selectedPiece = $piece;
        $piece.addClass('selected');
    }

    deselectPiece(x, y) {
        const $piece = this.$cell(x, y).find('img');
        this.$selectedPiece = null;
        $piece.removeClass('selected');
    }

    clearCell(x, y) {
        this.dehighlightCell(x, y);
        this.$cellContent(x, y).empty();
    }

    highlightCell(x, y) {
        if (this.hasHighlight(x, y) === false) {
            const [row, column] = BoardModel.getIndex(x, y);
            this.highlightStatus[row][column] = true;
            this.$cellContent(x, y).append('<div class="move"></div>');
        }
    }

    dehighlightCell(x, y) {
        if (this.hasHighlight(x, y) === true) {
            const [row, column] = BoardModel.getIndex(x, y);
            this.highlightStatus[row][column] = false;
            this.$cell(x, y).find('.move').remove();
        }
    }

    clearAllHighlight() {
        for (let x = -2; x <= 2; x += 1) {
            for (let y = -2; y <= 2; y += 1) {
                this.dehighlightCell(x, y);
            }
        }
    }

    hasHighlight(x, y) {
        const [row, column] = BoardModel.getIndex(x, y);
        return this.highlightStatus[row][column];
    }

    render(boardModel) {
        // 일단은 무조건 clear 후 다시 render
        for (let x = -2; x <= 2; x += 1) {
            for (let y = -2; y <= 2; y += 1) {
                this.clearCell(x, y);
                const $cellContent = this.$cellContent(x, y);
                if (boardModel.isEmptyCell(x, y) === false) {
                    const piece = boardModel.getPiece(x, y);
                    const color = piece.slice(0, 5);
                    const pieceName = piece.slice(5, piece.length).toLowerCase();

                    if ($cellContent.find('img').length === 0) {
                        const $img = $('<img>').attr({
                            class: `piece ${pieceName} ${color}`,
                            src: BoardView.ImageSource[piece],
                            draggable: 'false',
                        });
                        $cellContent.empty();
                        $cellContent.append($img);
                    }
                }
            }
        }
    }
}
BoardView.ImageSource = {
    blackKing: 'imgs/chesspiece/black-queen.png',
    blackPawn: 'imgs/chesspiece/black-pawn.png',
    whiteKing: 'imgs/chesspiece/white-queen.png',
    whitePawn: 'imgs/chesspiece/white-pawn.png',
};

export default BoardView;
