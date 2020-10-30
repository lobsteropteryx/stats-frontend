import moment from "moment"; 
import { getPlotData } from "../../app/ScatterPlot/selectors";

describe("Transforming chart data", () => {
    it("Returns an empty array when there are no actions", () => {
        const expected = [{
            id: "Cards Completed",
            data: []
        }];

        const state = { 
            date: {}, 
            filter: { 
                actions: [] 
            } 
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Returns data elements from actions", () => {
        const expected = [{
            id: "Cards Completed",
            data: [{
                id: 1,
                name: "test",
                url: "https://trello.com/c/1",
                x: "2020-01-01",
                y: "1"
            }]
        }];

        const state = { 
            date: {},
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    isComplete: true,
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(1, "days")
                }]
            }
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });

    it("Filters incomplete actions", () => {
        const expected = [{
            id: "Cards Completed",
            data: [{
                id: 2,
                name: "test2",
                url: "https://trello.com/c/2",
                x: "2020-01-02",
                y: "1"
            }]
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
                    completionDate: null,
                    duration: null 
                }, {
                    id: 2,
                    name: "test2",
                    isComplete: true,
                    completionDate: moment("2020-01-02"),
                    duration: moment.duration(1, "days")
                }]
            }
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Filters by date", () => {
        const expected = [{
            id: "Cards Completed",
            data: [{
                id: 2,
                name: "test2",
                url: "https://trello.com/c/2",
                x: "2020-01-02",
                y: "1"
            }]
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
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(1, "days")
                }, {
                    id: 2,
                    name: "test2",
                    isComplete: true,
                    completionDate: moment("2020-01-02"),
                    duration: moment.duration(1, "days")
                }, {
                    id: 3,
                    name: "test3",
                    isComplete: true,
                    completionDate: moment("2020-01-03"),
                    duration: moment.duration(1, "days")
                }]
            }
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });
});