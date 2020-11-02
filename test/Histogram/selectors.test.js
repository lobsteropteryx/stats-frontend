import moment from "moment"; 
import { getHistogramData } from "../../app/Histogram/selectors";

describe("Transforming histogram data", () => {
    it("Returns an empty array when there are no actions", () => {
        const expected = [];

        const state = {
            date: {}, 
            filter: { 
                actions: [] 
            } 
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Returns data elements from a single action", () => {
        const expected = [{
            id: "1",
            value: 1
        }];

        const state = { 
            date: {},
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    isComplete: true,
                    startDate: moment("2019-12-30"),
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(1, "days")
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });

    it("Returns data elements from actions", () => {
        const expected = [
        {
            id: "1",
            value: 1
        }, 
        {
            id: "2",
            value: 1
        }];

        const state = { 
            date: {},
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    isComplete: true,
                    startDate: moment("2019-12-30"),
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(1, "days")
                }, {
                    id: 2,
                    name: "test2",
                    isComplete: true,
                    startDate: moment("2019-12-30"),
                    completionDate: moment("2020-01-02"),
                    duration: moment.duration(2, "days")
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Filters incomplete actions", () => {
        const expected = [{
            id: "3",
            value: 1
        }];

        const state = { 
            date: {
                startDate: moment("2020-01-02"),
                endDate: moment("2020-01-02")
            },
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    isComplete: false,
                    startDate: moment("2019-12-30"),
                    completionDate: null,
                    duration: null 
                }, {
                    id: 2,
                    name: "test2",
                    isComplete: true,
                    startDate: moment("2019-12-30"),
                    completionDate: moment("2020-01-02"),
                    duration: moment.duration(3, "days")
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Filters by date", () => {
        const expected = [{
            id: "3",
            value: 1
        }];

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
                    startDate: moment("2019-12-30"),
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(1, "days")
                }, {
                    id: 2,
                    name: "test2",
                    isComplete: true,
                    startDate: moment("2019-12-30"),
                    completionDate: moment("2020-01-02"),
                    duration: moment.duration(3, "days")
                }, {
                    id: 3,
                    name: "test3",
                    isComplete: true,
                    startDate: moment("2019-12-30"),
                    completionDate: moment("2020-01-03"),
                    duration: moment.duration(3, "days")
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
});