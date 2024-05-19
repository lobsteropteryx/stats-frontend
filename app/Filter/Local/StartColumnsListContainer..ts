import { connect } from 'react-redux';
import { setStartColumn } from './localFilterSlice';
import List from '../List';

const mapStateToProps = state => {
    return {
        label: "Start Column",
        value: { value: state.localFilter.startColumn.id, label: state.localFilter.startColumn.name },
        options: state.localFilter.columns.map(column => {
            return {value: column.id, label: column.name}
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: option => {
            dispatch(setStartColumn({ id: option.value, name: option.label }))
        }
    }
};

const StartColumnsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default StartColumnsListContainer;