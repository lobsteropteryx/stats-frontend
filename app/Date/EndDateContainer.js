import { connect } from 'react-redux';
import moment from 'moment';
import { setEndDate } from './dateSlice';
import Date from './Date';

const mapStateToProps = state => {
    return {
        label: 'End Date',
        date: state.filter.endDate
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: date => {
            dispatch(setEndDate(moment(date)))
        }
    }
};

const StartDateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Date);

export default StartDateContainer;