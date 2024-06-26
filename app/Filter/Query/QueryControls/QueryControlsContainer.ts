import { connect } from 'react-redux';
import { Client as ApiClient } from '../../../Api/Client';
import { fetchCardsForBoard } from '../queryFilterSlice';

import QueryControls from './QueryControls';    

const mapStateToProps = state => {
    return {
        baseUrl: state.queryFilter.baseUrl,
        selectedBoard: state.queryFilter.selectedBoard,
        spinnerClass: state.queryFilter.isFetching ? 'spinner-enabled' : 'spinner-disabled',
        exportEnabled: state.queryFilter.exportEnabled,
        exportContent: state.queryFilter.csvData.content,
        exportUrl: state.queryFilter.csvData.url,
        exportFilename: state.queryFilter.csvData.filename,
        cards: state.localFilter.cards
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (event, apiClient, selectedBoard) => {
            dispatch(fetchCardsForBoard(apiClient, selectedBoard));
        },
        
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const apiClient = new ApiClient(stateProps.baseUrl);
    return {
        spinnerClass: stateProps.spinnerClass,
        exportEnabled: stateProps.exportEnabled,
        exportContent: stateProps.exportContent,
        exportUrl: stateProps.exportUrl,
        exportFilename: stateProps.exportFilename,
        onSubmit: (event) => {
            dispatchProps.onSubmit(
                event, 
                apiClient,
                stateProps.selectedBoard
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