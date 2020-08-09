import { connect } from 'react-redux';
import { fetchActionsForBoard } from '../filterSlice';
import SubmitButton from './SubmitButton';    

const mapStateToProps = state => {
    return {
        selectedBoardId: state.filter.selectedBoard.value,
        startColumnId: state.filter.startColumnId,
        endColumnId: state.filter.endColumnId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (event, selectedBoardId) => {
            dispatch(fetchActionsForBoard(selectedBoardId));
        }
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        onClick: (event) => {
            dispatchProps.onClick(
                event, 
                stateProps.selectedBoardId,
                stateProps.startColumnId,
                stateProps.endColumnId
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