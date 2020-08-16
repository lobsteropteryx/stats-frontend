import { connect } from 'react-redux';
import percentile from 'percentile';
import Stats from './Stats';    

const mapStateToProps = state => {
    const durations = state.filter.actions.map(x => x.duration.asDays());
    const n = durations.length; 
    return {
        n: n,
        fifty: Math.round(percentile(50, durations)),
        seventyFive: Math.round(percentile(75, durations)),
        eightyFive: Math.round(percentile(85, durations)),
        ninetyFive: Math.round(percentile(95, durations))
    }
};

const StatsContainer = connect(
    mapStateToProps,
    null,
    null
)(Stats);

export default StatsContainer;