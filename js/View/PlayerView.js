import PlayerModel from '../Model/Player';
import CardDatabase from '../Model/CardDatabase';
import CardModel from '../Model/Card';
import CardView from './CardView';

class PlayerView {
    constructor($view) {
        this.$view = $view;
        this.handCardViewList = [
            new CardView(this.$handCard(0)),
            new CardView(this.$handCard(1)),
        ];
        this.nextCardView = new CardView(this.$nextCard());
        this.$selectedCard = null;
    }

    $name() { return this.$view.find('.info .name'); }

    $turn() { return this.$view.find('.info .turn'); }

    $handCard(index) {
        if (typeof index !== 'number') {
            return this.$view.find('.hand .card');
        }
        if (index === 0 || index === 1) {
            return this.$view.find('.hand .card').eq(index);
        }
        throw Error('잘못된 Index 입니다.');
    }

    $nextCard() {
        return this.$view.find('.next-box .card');
    }

    handCardIndex($card) {
        return this.$handCard().index($card);
    }

    selectCard(index) {
        const $card = this.$handCard(index);
        this.$selectedCard = $card;
        $card.addClass('selected');
    }

    deselectCard(index) {
        const $card = this.$handCard(index);
        this.$selectedCard = null;
        $card.removeClass('selected');
    }

    render(playerModel) {
        // name
        this.$name().text(playerModel.name);
        // handCard
        this.handCardViewList.forEach((cardView, innerIndex) => {
            cardView.render(playerModel.handCardList[innerIndex]);
        });
        // nextCard
        if (playerModel.nextCard) {
            this.nextCardView.$view.removeClass('empty');
            this.nextCardView.render(playerModel.nextCard);
        } else {
            this.nextCardView.$view.addClass('empty');
        }
    }
}

export default PlayerView;
