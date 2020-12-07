import { connect } from 'react-redux';
import ApiClient from '../Trello/ApiClient'
import { fetchActionsForBoard } from '../filterSlice';
import SubmitButton from './SubmitButton';    

const mapStateToProps = state => {
    return {
        apiKey: state.filter.apiKey,
        token: state.filter.token,
        selectedBoardId: state.filter.selectedBoard.value,
        spinnerClass: state.filter.isFetching ? 'spinner-enabled' : 'spinner-disabled'
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (event, apiClient, selectedBoardId) => {
            dispatch(fetchActionsForBoard(apiClient, selectedBoardId));
        }
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const apiClient = new ApiClient(stateProps.apiKey, stateProps.token);
    return {
        spinnerClass: stateProps.spinnerClass,
        onClick: (event) => {
            dispatchProps.onClick(
                event, 
                apiClient,
                stateProps.selectedBoardId
            )
        }
    }
}

const SubmitButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(SubmitButton);

export default SubmitButtonContainer;