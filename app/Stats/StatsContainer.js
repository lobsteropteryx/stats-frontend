import { connect } from 'react-redux';
import { mean, std } from 'mathjs';
import Stats from './Stats';    

const mapStateToProps = state => {
    const durations = state.filter.actions.map(x => x.duration.asDays());
    const n = durations.length; 
    return {
        average: n === 0 ? 0 : Math.round(mean(durations)),
        stdev: n === 0 ? 0 : Math.round(std(durations)),
        n: n
    }
};

const StatsContainer = connect(
    mapStateToProps,
    null,
    null
)(Stats);

export default StatsContainer;