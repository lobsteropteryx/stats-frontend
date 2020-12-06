import moment from "moment";
import { getPercentiles } from "../../app/Stats/selectors";

describe("Calculating percentiles", () => {
    it("Sets percentiles to 0 when there are no actions", () => {
        const expected = {
            n: 0,
            fifty: 0,
            seventyFive: 0,
            eightyFive: 0, 
            ninetyFive: 0 
        }

        const state = { 
            date: {}, 
            filter: { 
                cards: [] 
            } 
        };

        const actual = getPercentiles(state);

        expect(actual).toEqual(expected);
    });
    
    it("Calculates percentiles from a single action", () => {
        const expected = {
            n: 1,
            fifty: 1,
            seventyFive: 1,
            eightyFive: 1, 
            ninetyFive: 1 
        };

        const state = { 
            date: {},
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(1, "days")
                }]
            }
        };

        const actual = getPercentiles(state);

        expect(actual).toEqual(expected);
    });

    it("Calculates percentiles from actions", () => {
        const expected = {
            n: 2,
            fifty: 1,
            seventyFive: 2,
            eightyFive: 2, 
            ninetyFive: 2 
        };

        const state = { 
            date: {},
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(1, "days")
                }, {
                    id: 2,
                    name: "test2",
                    completionDate: moment("2020-01-02"),
                    duration: moment.duration(2, "days")
                }]
            }
        };

        const actual = getPercentiles(state);

        expect(actual).toEqual(expected);
    });
    
    it("Filters percentiles to only completed stories", () => {
        const expected = {
            n: 1,
            fifty: 1,
            seventyFive: 1,
            eightyFive: 1, 
            ninetyFive: 1 
        };

        const state = {
            date: {
                startDate: moment("2020-01-02"),
                endDate: moment("2020-01-02")
            },
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    isComplete: true,
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(3, "days")
                }, {
                    id: 2,
                    name: "test2",
                    isComplete: true,
                    completionDate: moment("2020-01-02"),
                    duration: moment.duration(1, "days")
                }, {
                    id: 3,
                    name: "test3",
                    isComplete: false,
                    completionDate: null,
                    duration: null 
                }]
            }
        };

        const actual = getPercentiles(state);

        expect(actual).toEqual(expected);
    });
    it("Filters percentiles based on date", () => {
        const expected = {
            n: 1,
            fifty: 1,
            seventyFive: 1,
            eightyFive: 1, 
            ninetyFive: 1 
        };

        const state = {
            date: {
                startDate: moment("2020-01-02"),
                endDate: moment("2020-01-02")
            },
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(3, "days")
                }, {
                    id: 2,
                    name: "test2",
                    completionDate: moment("2020-01-02"),
                    duration: moment.duration(1, "days")
                }, {
                    id: 3,
                    name: "test3",
                    completionDate: moment("2020-01-03"),
                    duration: moment.duration(2, "days")
                }]
            }
        };

        const actual = getPercentiles(state);

        expect(actual).toEqual(expected);
    });
});