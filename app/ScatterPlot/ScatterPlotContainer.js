import { connect } from 'react-redux';
import ScatterPlot from './ScatterPlot';

const mapStateToProps = state => {
    return {
        data: [{
            id: "Cards Completed",
            data: state.filter.actions.map(action => {
                return {
                    id: action.id,
                    x: action.completionDate.format("YYYY-MM-DD"),
                    y: parseFloat(action.duration.asDays(), 1).toPrecision(1)
                };
            })
        }]
    };
};

const ScatterPlotContainer = connect(
    mapStateToProps,
    null
)(ScatterPlot);

export default ScatterPlotContainer;