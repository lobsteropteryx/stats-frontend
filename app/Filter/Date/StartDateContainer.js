import { connect } from 'react-redux';
import { setStartDate } from '../filterSlice';
import Date from './Date';

const mapStateToProps = state => {
    return {
        label: 'Start Date',
        date: state.filter.startDate
    }
};  

const mapDispatchToProps = dispatch => {
    return {
        onChange: date => {
            dispatch(setStartDate(date))
        }
    }
};

const StartDateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Date);

export default StartDateContainer;