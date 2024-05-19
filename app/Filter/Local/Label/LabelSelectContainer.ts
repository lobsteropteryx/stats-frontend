import { connect } from 'react-redux';
import { selectLabels } from '../localFilterSlice';
import LabelSelect from './LabelSelect';

const mapStateToProps = state => {
    return {
        label: "Labels",
        value: state.localFilter.selectedLabels.map(label => {
            return {value: label.id, label: label.name};
        }),
        options: state.localFilter.labels.map(label => {
            return {value: label.id, label: label.name};
        })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: selectedOptions => {
            dispatch(selectLabels(selectedOptions.map(option => { 
                return {id: option.value, name: option.label };
            })));
        }
    }
};

const LabelSelectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LabelSelect);

export default LabelSelectContainer;