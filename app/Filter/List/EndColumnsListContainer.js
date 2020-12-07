import { connect } from 'react-redux';
import { setEndColumn } from '../filterSlice';
import List from './List';

const mapStateToProps = state => {
    return {
        label: "End Column",
        value: { value: state.filter.endColumn.id, label: state.filter.endColumn.name },
        options: state.filter.columns.map(column => {
            return {value: column.id, label: column.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: e => {
            dispatch(setEndColumn(e))
        }
    }
};

const EndColumnsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default EndColumnsListContainer;