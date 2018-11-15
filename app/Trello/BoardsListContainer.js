import { connect } from 'react-redux';
import { getBoards } from './actions';
import BoardsList from './BoardsList';

const mapStateToProps = state => {
    return {
        boards: state.trelloData.boards
    }
};


const BoardsListContainer = connect(
    mapStateToProps
)(BoardsList);

export default BoardsListContainer