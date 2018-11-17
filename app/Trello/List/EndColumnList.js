import { connect } from 'react-redux';
import { selectEndingColumn } from './../actions';
import List from './List';

const mapStateToProps = state => {
    return {
        value: state.trello.endingColumn,
        options: state.trello.columns.map(column => {
            return {value: column.id, label: column.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: column => {
            dispatch(selectEndingColumn(column))
        }
    }
};

const EndingColumnsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default EndingColumnsList