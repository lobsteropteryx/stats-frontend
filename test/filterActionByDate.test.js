import filterActionByDate from "../app/filterActionByDate";

describe('Filtering actions', () => {
    it('Returns true if startDate is null', () => {
        const action = {
            completionDate: new Date(1, 1, 2020)
        };
        const startDate = null;
        const endDate = new Date(1, 2, 2020);

        expect(filterActionByDate(action, startDate, endDate)).toBe(true);
    });
});