import { connect } from 'react-redux';
import { ApiClient } from '../../../Trello/ApiClient';
import { fetchActionsForBoard } from '../queryFilterSlice';
import SubmitButton from './SubmitButton';    

const mapStateToProps = state => {
    return {
        apiKey: state.queryFilter.apiKey,
        token: state.queryFilter.token,
        selectedBoardId: state.queryFilter.selectedBoard.value,
        spinnerClass: state.queryFilter.isFetching ? 'spinner-enabled' : 'spinner-disabled',
        exportEnabled: state.queryFilter.exportEnabled
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (event, apiClient, selectedBoardId) => {
            dispatch(fetchActionsForBoard(apiClient, selectedBoardId));
        },
        onExport: (event) => {
            alert("export data");
        }
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const apiClient = new ApiClient(stateProps.apiKey, stateProps.token);
    return {
        spinnerClass: stateProps.spinnerClass,
        onExport: dispatchProps.onExport,
        onSubmit: (event) => {
            dispatchProps.onSubmit(
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