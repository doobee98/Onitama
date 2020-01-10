import CardDatabase from '../Model/CardDatabase';
import CardModel from '../Model/Card';
import Player from '../Model/Player';
import PlayerView from '../View/PlayerView';
import Board from '../Model/Board';
import BoardView from '../View/BoardView';
import $TableView from '../View/$TableView';

class GameController {
    constructor() {
        const classThis = this;
        this.language = 'KOR';
        this.boardModel = new Board();
        this.boardView = new BoardView();
        this.currentPlayerIndex = Math.floor(Math.random() * 2);
        this.playerModel = [
            new Player('김철수', 'white', [1, 1]),
            new Player('홍길동', 'black', [-1, -1]),
        ];
        this.playerView = [new PlayerView($('.player')), new PlayerView($('.opponent'))];
        this.cardModelList = [null, null, null, null, null];

        // cardModelList 초기화
        const cardIndexList = [];
        for (let i = 0; i < this.cardModelList.length; i += 1) {
            let newNum = -1;
            do {
                newNum = Math.floor(Math.random() * CardDatabase.length);
            } while (cardIndexList.indexOf(newNum) !== -1);
            cardIndexList.push(newNum);
            this.cardModelList[i] = new CardModel(newNum);
        }

        // playerModel에 카드 배부
        this.currentPlayerModel().handCardList = this.cardModelList.slice(0, 2);
        this.opponentPlayerModel().handCardList = this.cardModelList.slice(2, 4);
        // eslint-disable-next-line prefer-destructuring
        this.currentPlayerModel().nextCard = this.cardModelList[4];

        // boardView piece click 이벤트 등록
        $(document).on('click', '.board .piece', function clickPiece() {
            const $this = $(this);
            const currentColor = classThis.currentPlayerModel().color;
            if ($this.hasClass(currentColor)) {
                const { boardView } = classThis;
                const $beforePiece = boardView.$selectedPiece;
                const [x, y] = boardView.cellPos($this);
                if ($beforePiece) {
                    const [beforeX, beforeY] = boardView.cellPos($beforePiece);
                    boardView.deselectPiece(beforeX, beforeY);
                    boardView.clearAllHighlight(); // 오버헤드
                }
                if ($this.is($beforePiece) === false) {
                    boardView.selectPiece(x, y);
                    const $currentCard = classThis.currentPlayerView().$selectedCard;
                    if ($currentCard) {
                        classThis.highlightMovable($this, $currentCard);
                    }
                }
            }
        });

        // boardView move click 이벤트 등록
        $(document).on('click', '.board .move', function clickmove() {
            const $this = $(this);
            const { boardView } = classThis;
            const from = boardView.cellPos(boardView.$selectedPiece);
            const to = boardView.cellPos($this);

            classThis.playAction(from, to);
        });

        // player View card click 이벤트 등록
        $(document).on('click', '.hand > .card', function clickCard() {
            const $this = $(this);
            const playerView = classThis.currentPlayerView();
            const $currentHand = playerView.$handCard();
            const $beforeCard = playerView.$selectedCard;

            if ($currentHand.filter($this).length !== 0) {
                if ($beforeCard) {
                    playerView.deselectCard(playerView.handCardIndex($beforeCard));
                    classThis.boardView.clearAllHighlight(); // 오버헤드
                }
                if ($this.is($beforeCard) === false) {
                    playerView.selectCard(playerView.handCardIndex($this));
                    const $currentPiece = classThis.boardView.$selectedPiece;
                    if ($currentPiece) {
                        classThis.highlightMovable($currentPiece, $this);
                    }
                }
            }
        });

        this.renderCurrentPlayer();
        this.renderOpponentPlayer();
        this.renderBoard();
        this.renderTurn();
    }

    get opponentPlayerIndex() { return (this.currentPlayerIndex + 1) % 2; }

    // eslint-disable-next-line class-methods-use-this
    set opponentPlayerIndex(value) { throw Error('Cannot set opponentPlayerIndex'); }


    currentPlayerModel() { return this.playerModel[this.currentPlayerIndex]; }

    currentPlayerView() { return this.playerView[this.currentPlayerIndex]; }

    opponentPlayerModel() { return this.playerModel[this.opponentPlayerIndex]; }

    opponentPlayerView() { return this.playerView[this.opponentPlayerIndex]; }


    renderCurrentPlayer() { this.currentPlayerView().render(this.currentPlayerModel()); }

    renderOpponentPlayer() { this.opponentPlayerView().render(this.opponentPlayerModel()); }

    renderBoard() { this.boardView.render(this.boardModel); }

    renderTurn() {
        const $currentTurn = this.currentPlayerView().$turn();
        const $opponentTurn = this.opponentPlayerView().$turn();
        $currentTurn.text('TURN');
        $currentTurn.css('visibility', 'visible');
        $opponentTurn.text('WAIT');
        $opponentTurn.css('visibility', 'hidden');
    }


    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        this.renderTurn();
    }

    highlightMovable($piece, $card) {
        const { boardModel, boardView } = this;
        const [currentX, currentY] = $TableView.cellPos($piece);
        const currentColor = this.currentPlayerModel().color;
        const currentCardName = $card.find('.card-name').text();
        const cardModelIter = this.cardModelList.find(
            (card) => card.name[this.language] === currentCardName,
        );
        cardModelIter.movable.forEach(([moveX, moveY]) => {
            /*
                1. 현재 위치인 currentX, currentY에서 card movable만큼 이동한 nextX, nextY가 올바른 위치이고
                2. 같은 색깔의 말이 위치하지 않는다면
                -> highlight한다 (move 표시)
            */
            const [dirX, dirY] = this.currentPlayerModel().moveDir;
            const [nextX, nextY] = [currentX + moveX * dirX, currentY + moveY * dirY];
            if (Board.isValidPos(nextX, nextY)) {
                if (boardModel.getPiece(nextX, nextY).includes(currentColor) === false) {
                    boardView.highlightCell(nextX, nextY);
                }
            }
        });
    }

    playAction(from, to) {
        const $currentCard = this.currentPlayerView().$selectedCard;
        const currentHandIndex = this.currentPlayerView().handCardIndex($currentCard);
        const currentCardModel = this.currentPlayerModel().handCardList[currentHandIndex];
        const nextCardModel = this.currentPlayerModel().nextCard;
        const [fromX, fromY] = from;

        this.currentPlayerView().deselectCard(currentHandIndex);
        this.currentPlayerModel().removeNextCard();
        this.opponentPlayerModel().setNextCard(currentCardModel);
        this.currentPlayerModel().setHandCard(currentHandIndex, nextCardModel);

        this.boardModel.movePiece(from, to);
        this.boardView.deselectPiece(fromX, fromY);
        this.renderBoard();
        this.renderCurrentPlayer();
        this.renderOpponentPlayer();

        const whoWin = this.checkWhoWin();
        if (whoWin) {
            this.endGame(whoWin);
        } else {
            this.nextTurn();
        }
    }

    checkWhoWin() {
        /*
            1. 상대 왕을 잡은 경우
            2. 상대 성에 들어간 경우
            3. 시간이 다 지난 경우 (미구현)
        */
        const $boardView = this.boardView.$view;
        const currentColor = this.currentPlayerModel().color;
        const opponentColor = this.opponentPlayerModel().color;
        const opponentHomeStr = `${opponentColor}-home`;
        const $opponentHome = $boardView.find(`.${opponentHomeStr}`);

        if ($opponentHome.find(`.piece.king.${currentColor}`).length !== 0) {
            return currentColor;
        }
        if ($boardView.find(`td .piece.king.${opponentColor}`).length === 0) {
            return currentColor;
        }
        return null;
    }

    endGame(winner) {
        const winnerIndex = (winner === this.playerModel[0].color) ? 0 : 1;
        const loserIndex = (winnerIndex + 1) % 2;
        const $winnerTurn = this.playerView[winnerIndex].$turn();
        const $loserTurn = this.playerView[loserIndex].$turn();
        $winnerTurn.text('WIN!');
        $winnerTurn.css('visibility', 'visible');
        $loserTurn.text('LOSE');
        $loserTurn.css('visibility', 'visible');
        this.currentPlayerIndex = null;
    }
}

export default GameController;
