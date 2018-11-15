import { connect } from 'react-redux';
import { getBoards } from './actions';
import BoardsList from './BoardsList';

const mapStateToProps = state => {
    return {
        boards: state.trello.boards.map(board => {
            return {value: board.id, label: board.name}
        })
    }
};


const BoardsListContainer = connect(
    mapStateToProps
)(BoardsList);

export default BoardsListContainer