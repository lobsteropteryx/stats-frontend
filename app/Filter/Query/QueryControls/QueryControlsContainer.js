import { connect } from 'react-redux';
import { ApiClient } from '../../../Trello/ApiClient';
import { fetchActionsForBoard } from '../queryFilterSlice';
import { getExportParameters } from './selectors';
import QueryControls from './QueryControls';    

const mapStateToProps = state => {
    const {content, url, filename} = getExportParameters(state);
    return {
        content,
        url,
        filename,
        apiKey: state.queryFilter.apiKey,
        token: state.queryFilter.token,
        selectedBoardId: state.queryFilter.selectedBoard.id,
        spinnerClass: state.queryFilter.isFetching ? 'spinner-enabled' : 'spinner-disabled',
        exportEnabled: state.queryFilter.exportEnabled,
        exportContent: state.localFilter.cards
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (event, apiClient, selectedBoardId) => {
            dispatch(fetchActionsForBoard(apiClient, selectedBoardId));
        }
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const apiClient = new ApiClient(stateProps.apiKey, stateProps.token);
    return {
        spinnerClass: stateProps.spinnerClass,
        exportEnabled: stateProps.exportEnabled,
        exportContent: stateProps.content,
        exportUrl: stateProps.url,
        exportFilename: stateProps.filename,
        onSubmit: (event) => {
            dispatchProps.onSubmit(
                event, 
                apiClient,
                stateProps.selectedBoardId
            )
        }
    }
}

const QueryControlsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(QueryControls);

export default QueryControlsContainer;