import Card from './Card';

class Player {
    constructor(name, color, moveDir) {
        this.name = name;
        this.color = color;
        this.moveDir = moveDir;
        this.handCardList = [null, null];
        this.nextCard = null;
    }

    setHandCard(index, newCard) {
        this.handCardList[index] = newCard;
    }

    removeHandCard(index) {
        this.handCardList[index] = null;
    }

    setNextCard(newCard) {
        this.nextCard = newCard;
    }

    removeNextCard() {
        this.nextCard = null;
    }
}

export default Player;
