import { connect } from 'react-redux';
import { setStartColumn } from '../filterSlice';
import List from './List';

const mapStateToProps = state => {
    return {
        label: "Start Column",
        value: state.filter.startColumn,
        options: state.filter.columns.map(column => {
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

const StartColumnsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default StartColumnsListContainer;