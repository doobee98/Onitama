import BoardModel from '../Model/Board';

class $TableView {
    static $cellView($table, x, y) {
        const [row, column] = BoardModel.getIndex(x, y);
        return $table.find('tr').eq(column)
            .find('td').eq(row);
    }

    static cellPos($cell) {
        const $table = $cell.closest('table');
        const $tr = $cell.closest('tr');
        const $td = $cell.closest('td');
        const column = $table.find('tr').index($tr);
        const row = $tr.find('td').index($td);
        return BoardModel.getPos(row, column);
    }
}

export default $TableView;
