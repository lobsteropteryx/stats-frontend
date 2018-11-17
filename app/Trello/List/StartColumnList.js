import { connect } from 'react-redux';
import { setStartColumn } from './../actions';
import List from './List';

const mapStateToProps = state => {
    return {
        label: "Start Column",
        value: state.trello.startColumn,
        options: state.trello.columns.map(column => {
            return {value: column.id, label: column.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: column => {
            dispatch(setStartColumn(column))
        }
    }
};

const StartColumnList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default StartColumnList