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
                    y: action.duration
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