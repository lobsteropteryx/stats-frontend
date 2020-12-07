import { connect } from 'react-redux';
import { ApiClient } from '../../../Trello/ApiClient';
import { fetchActionsForBoard } from '../queryFilterSlice';
import SubmitButton from './SubmitButton';    

const mapStateToProps = state => {
    return {
        apiKey: state.queryFilter.apiKey,
        token: state.queryFilter.token,
        selectedBoardId: state.queryFilter.selectedBoard.value,
        spinnerClass: state.queryFilter.isFetching ? 'spinner-enabled' : 'spinner-disabled'
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