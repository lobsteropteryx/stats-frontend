import { connect } from 'react-redux';
import { first } from 'lodash';
import { getHistogramData } from './selectors';
import { HISTOGRAM } from '../Settings/settingsSlice';
import Histogram from './Histogram';

const mapStateToProps = state => {
    const data = getHistogramData(state);
    return {
        data: data,
        keys: data.map(x => first(Object.keys(x))),
        display: state.settings.displayMode === HISTOGRAM ? 'block' : 'none'
    };
};

const HistogramContainer = connect(
    mapStateToProps
)(Histogram);

export default HistogramContainer;