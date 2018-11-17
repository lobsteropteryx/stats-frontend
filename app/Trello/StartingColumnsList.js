import { connect } from 'react-redux';
import { selectStartingColumn } from './actions';
import List from './List';

const mapStateToProps = state => {
    return {
        value: state.trello.startingColumn,
        options: state.trello.columns.map(column => {
            return {value: column.id, label: column.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: column => {
            dispatch(selectStartingColumn(column))
        }
    }
};

const StartingColumnsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default StartingColumnsList