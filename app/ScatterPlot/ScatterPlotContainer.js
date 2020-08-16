import { connect } from 'react-redux';
import ScatterPlot from './ScatterPlot';

const mapStateToProps = state => {
    return {
        data: [{
            id: "Cards Completed",
            data: state.filter.actions.map(action => {
                return {
                    id: action.id,
                    name: action.name,
                    url: `https://trello.com/c/${action.id}`,
                    x: action.completionDate.format("YYYY-MM-DD"),
                    y: parseFloat(action.duration.asDays(), 1).toPrecision(1)
                };
            })
        }]
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