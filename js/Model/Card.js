import CardDatabase from './CardDatabase';

class Card {
    constructor(id) {
        const databaseContent = CardDatabase[id];

        this.id = id;
        this.movable = databaseContent.movable;
        this.name = {
            ENG: databaseContent.engName,
            KOR: databaseContent.korName,
        };
    }
}

export default Card;
