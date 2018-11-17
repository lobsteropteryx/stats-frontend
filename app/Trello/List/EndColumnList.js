import { connect } from 'react-redux';
import { setEndColumn } from './../actions';
import List from './List';

const mapStateToProps = state => {
    return {
        label: "End Column",
        value: state.trello.endColumn,
        options: state.trello.columns.map(column => {
            return {value: column.id, label: column.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: column => {
            dispatch(setEndColumn(column))
        }
    }
};

const EndColumnList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default EndColumnList