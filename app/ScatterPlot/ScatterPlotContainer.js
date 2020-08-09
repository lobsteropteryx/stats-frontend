import { connect } from 'react-redux';
import ScatterPlot from './ScatterPlot';

const mapStateToProps = state => {
    return {
        id: "Cards Completed",
        data: state.filter.actions.map(action => {
            return {
                x: action.completionDate.format,
                y: action.duration
            };
        })
    };
};

const ScatterPlotContainer = connect(
    mapStateToProps,
    null
)(ScatterPlot);

export default ScatterPlotContainer;