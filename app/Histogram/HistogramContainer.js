import { connect } from 'react-redux';
import { getHistogramData } from './selectors';
import { HISTOGRAM } from '../Settings/settingsSlice';
import Histogram from './Histogram';

const mapStateToProps = state => {
    return {
        data: getHistogramData(state),
        display: state.settings.displayMode === HISTOGRAM ? 'block' : 'none'
    };
};

const HistogramContainer = connect(
    mapStateToProps
)(Histogram);

export default HistogramContainer;