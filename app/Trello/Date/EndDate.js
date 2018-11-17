import { connect } from 'react-redux';
import { setEndDate } from '../actions';
import Date from './Date';

const mapStateToProps = state => {
    return {
        label: 'End Date',
        date: state.trello.endDate
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: date => {
            dispatch(setEndDate(date))
        }
    }
};

const StartDate = connect(
    mapStateToProps,
    mapDispatchToProps
)(Date);

export default StartDate