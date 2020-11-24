import moment from 'moment';

export default interface Action {
    id: string,
    name: string,
    isComplete: boolean,
    startDate: moment.Moment,
    completionDate: moment.Moment,
    duration: moment.Duration
}