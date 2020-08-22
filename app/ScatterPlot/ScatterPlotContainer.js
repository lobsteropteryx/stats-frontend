import { connect } from 'react-redux';
import { getPlotData } from './selectors';
import { SCATTER } from '../Settings/settingsSlice';
import ScatterPlot from './ScatterPlot';

const mapStateToProps = state => {
    return {
        data: getPlotData(state),
        display: state.settings.displayMode === SCATTER ? 'block' : 'none'
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (node, event) => {
            window.open(node.data.url, '_blank');
        }
    }
};

const ScatterPlotContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScatterPlot);

export default ScatterPlotContainer;