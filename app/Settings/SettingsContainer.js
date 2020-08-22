import { connect } from 'react-redux';
import Settings from './Settings';
import { setDisplayMode, SCATTER, HISTOGRAM } from './settingsSlice';

const mapStateToProps = state => {
    return {
        label: "Display Mode",
        value: state.settings.displayMode,
        options: [
            { value: SCATTER, label: "Scatter Plot" },
            { value: HISTOGRAM, label: "Histogram" }
        ]
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: e => {
            dispatch(setDisplayMode(e.value))
        }
    }
};

const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

export default SettingsContainer;