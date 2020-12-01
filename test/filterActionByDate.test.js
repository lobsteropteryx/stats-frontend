import { filterActionByDate } from "../app/cardFilters";

describe('Filtering actions', () => {
    it('Returns true if startDate is null and end date is less than completion date', () => {
        const action = {
            completionDate: new Date(1, 1, 2020)
        };
        const startDate = null;
        const endDate = new Date(1, 2, 2020);

        expect(filterActionByDate(action, startDate, endDate)).toBe(true);
    });

    it('Returns true if startDate is greater than completion date and end date is less than completion date', () => {
        const action = {
            completionDate: new Date(1, 2, 2020)
        };
        const startDate = new Date(1, 1, 2020);
        const endDate = new Date(1, 3, 2020);

        expect(filterActionByDate(action, startDate, endDate)).toBe(true);
    });

    it('Returns true if endDate is null and start date is less than completion date', () => {
        const action = {
            completionDate: new Date(1, 2, 2020)
        };
        const startDate = new Date(1, 1, 2020);
        const endDate = null;

        expect(filterActionByDate(action, startDate, endDate)).toBe(true);
    });

    it('Returns false if startDate is less than completion date and end date is greater than completion date', () => {
        const action = {
            completionDate: new Date(1, 2, 2020)
        };
        const startDate = new Date(1, 3, 2020);
        const endDate = new Date(1, 1, 2020);

        expect(filterActionByDate(action, startDate, endDate)).toBe(false);
    });

    it('Returns false if completion date is null', () => {
        const action = {
            completionDate: null 
        };
        const startDate = null;
        const endDate = null;

        expect(filterActionByDate(action, startDate, endDate)).toBe(false);
    });
});