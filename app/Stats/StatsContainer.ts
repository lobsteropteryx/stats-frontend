import { connect } from 'react-redux';
import Stats from './Stats';    
import { getPercentiles } from './selectors';

const mapStateToProps = state => {
   return getPercentiles(state) 
};

const StatsContainer = connect(
    mapStateToProps
)(Stats);

export default StatsContainer;