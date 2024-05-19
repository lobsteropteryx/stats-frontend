import { connect } from 'react-redux';
import { setEndColumn } from './localFilterSlice';
import List from '../List';

const mapStateToProps = state => {
    return {
        label: "End Column",
        value: { value: state.localFilter.endColumn.id, label: state.localFilter.endColumn.name },
        options: state.localFilter.columns.map(column => {
            return {value: column.id, label: column.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: option => {
            dispatch(setEndColumn({ id: option.value, name: option.label }))
        }
    }
};

const EndColumnsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default EndColumnsListContainer;