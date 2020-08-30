import reducer from '../../app/Date/dateSlice';
import {
    setStartDate,
    setEndDate
} from '../../app/Date/dateSlice';

describe("Dates", () => {
    it("sets the start date", () => {
        const state = {};
        const date = new Date('Jan 1, 2000');
        const action = setStartDate(date);
        const expectedState = {startDate: date};
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it("sets the end date", () => {
        const state = {};
        const date = new Date('Jan 1, 2000');
        const action = setEndDate(date);
        const expectedState = {endDate: date};
        expect(reducer(state, action)).toEqual(expectedState);
    });
});