import { connect } from 'react-redux';
import { selectBoard } from '../filterSlice';
import { fetchColumnsForBoard } from '../filterSlice';
import List from './List';

const mapStateToProps = state => {
    return {
        label: "Board",
        options: state.filter.boards.map(board => {
            return {value: board.id, label: board.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: board => {
            dispatch(selectBoard(board));
            dispatch(fetchColumnsForBoard(board.value));
        }
    }
};

const BoardsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default BoardsListContainer;