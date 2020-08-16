import { connect } from 'react-redux';
import { setEndColumn } from '../filterSlice';
import List from './List';

const mapStateToProps = state => {
    return {
        label: "End Column",
        value: state.filter.endColumn,
        options: state.filter.columns.map(column => {
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

const EndColumnsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default EndColumnsListContainer;