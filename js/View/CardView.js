import CardModel from '../Model/Card';
import $TableView from './$TableView';

class CardView {
    constructor($view) {
        this.$view = $view;
    }

    render(cardModel) {
        const $card = this.$view;
        $card.children('.card-name').text(cardModel.name.KOR); // language
        $card.find('.movable').removeClass('movable');
        cardModel.movable.forEach(([x, y]) => {
            const $table = $card.find('table');
            const $tableCell = $TableView.$cellView($table, x, y);
            $tableCell.addClass('movable');
        });
    }
}

export default CardView;
