import { connect } from 'react-redux';
import { ApiClient } from '../../Trello/ApiClient';
import { selectBoard } from './queryFilterSlice';
import { fetchDataForBoard } from './queryFilterSlice';
import List from '../List';

const mapStateToProps = state => {
    return {
        label: "Board",
        options: state.queryFilter.boards.map(board => {
            return {value: board.id, label: board.name}
        }),
        apiKey: state.queryFilter.apiKey,
        token: state.queryFilter.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: (option, apiClient) => {
            dispatch(selectBoard({id: option.value, name: option.label}));
            dispatch(fetchDataForBoard(apiClient, option.value));
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