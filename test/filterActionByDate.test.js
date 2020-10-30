import filterActionByDate from "../app/filterActionByDate";

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
});