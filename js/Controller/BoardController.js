import Board from '../Model/Board';

class BoardController {
    constructor() {
        this.boardModel = new Board();
    }

    get board() { return this.boardModel; }

    set board(value) { this.boardModel = value; }
}

export default BoardController;
