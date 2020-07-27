import { connect } from 'react-redux';
import { fetchActionsForBoard } from '../filterSlice';
import SubmitButton from './SubmitButton';    

const mapStateToProps = state => {
    return {
        selectedBoardId: state.filter.selectedBoard.value
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
            dispatchProps.onClick(event, stateProps.selectedBoardId)
        }
    }
}

const SubmitButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(SubmitButton);

export default SubmitButtonContainer;