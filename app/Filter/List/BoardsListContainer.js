import { connect } from 'react-redux';
import { ApiClient } from '../../Trello/ApiClient';
import { selectBoard } from '../filterSlice';
import { fetchColumnsForBoard } from '../filterSlice';
import List from './List';

const mapStateToProps = state => {
    return {
        label: "Board",
        options: state.filter.boards.map(board => {
            return {value: board.id, label: board.name}
        }),
        apiKey: state.filter.apiKey,
        token: state.filter.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: (option, apiClient) => {
            dispatch(selectBoard(option));
            dispatch(fetchColumnsForBoard(apiClient, option.value));
        }
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const apiClient = new ApiClient(stateProps.apiKey, stateProps.token);
    return {
        label: stateProps.label,
        options: stateProps.options,
        onChange: (option) => {
            dispatchProps.onChange(option, apiClient);
        }
    }
}

const BoardsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(List);

export default BoardsListContainer;