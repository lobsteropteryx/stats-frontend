import { connect } from 'react-redux';
import { selectBoard } from './actions';
import BoardsList from './BoardsList';

const mapStateToProps = state => {
    return {
        boards: state.trello.boards.map(board => {
            return {value: board.id, label: board.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onBoardChange: board => {
            dispatch(selectBoard(board))
        }
    }
};

const BoardsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardsList);

export default BoardsListContainer