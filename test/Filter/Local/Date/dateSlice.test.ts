import reducer from '../../../../app/Filter/Local/Date/dateSlice';
import {
    setStartDate,
    setEndDate
} from '../../../../app/Filter/Local/Date/dateSlice';

describe("Dates", () => {
    it("sets the start date", () => {
        const state = {startDate: '', endDate: ''};
        const date = new Date('Jan 1, 2000').toISOString();
        const action = setStartDate(date);
        const expectedState = {...state, startDate: date};
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it("sets the end date", () => {
        const state = {startDate: '', endDate: ''};
        const date = new Date('Jan 1, 2000').toISOString();
        const action = setEndDate(date);
        const expectedState = {...state, endDate: date};
        expect(reducer(state, action)).toEqual(expectedState);
    });
});