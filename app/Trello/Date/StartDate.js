import { connect } from 'react-redux';
import { setStartDate } from '../actions';
import Date from './Date';

const mapStateToProps = state => {
    return {
        label: 'Start Date',
        date: state.trello.startDate
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: date => {
            dispatch(setStartDate(date))
        }
    }
};

const StartDate = connect(
    mapStateToProps,
    mapDispatchToProps
)(Date);

export default StartDate