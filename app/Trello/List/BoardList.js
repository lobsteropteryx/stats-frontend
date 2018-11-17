import { connect } from 'react-redux';
import { selectBoard } from './../actions';
import List from './List';

const mapStateToProps = state => {
    return {
        label: "Board",
        options: state.trello.boards.map(board => {
            return {value: board.id, label: board.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: board => {
            dispatch(selectBoard(board))
        }
    }
};

const BoardsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default BoardsList