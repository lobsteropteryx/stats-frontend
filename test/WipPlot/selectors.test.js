import moment from "moment"; 
import { getPlotData } from "../../app/WipPlot/selectors";

describe("Transforming WIP data", () => {
    it("Returns an empty array when there are no actions", () => {
        const expected = [{
            id: "WIP",
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

    it("Filters out actions with no start date", () => {
        const expected = [{
            id: "WIP",
            data: [{
                x: "January",
                y: 1
            }]
        }];

        const state = {
            date: {}, 
            filter: { 
                actions: [{
                    id: 1,
                    name: "test",
                    startDate: moment("2020-01-01"),
                    isComplete: true,
                    completionDate: moment("2020-01-02"),
                    duration: moment.duration(1, "days")
                }, {
                    id: 2,
                    name: "test2",
                    startDate: null,
                    isComplete: false,
                    completionDate: null,
                    duration: null
                }]
            } 
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected); 
    })

    describe("Incomplete actions", () => {
        it("First day of the month", () => {
            const expected = [{
                id: "WIP",
                data: [{
                    x: "January",
                    y: 1
                }]
            }];

            const state = {
                date: {}, 
                filter: { 
                    actions: [{
                        id: 1,
                        name: "test",
                        startDate: moment("2020-01-01"),
                        isComplete: false,
                        completionDate: null,
                        duration: null
                    }]
                } 
            };

            const actual = getPlotData(state);

            expect(actual).toEqual(expected);
        });

        it("Last day of the month", () => {
            const expected = [{
                id: "WIP",
                data: [{
                    x: "January",
                    y: 1
                }]
            }];

            const state = {
                date: {}, 
                filter: { 
                    actions: [{
                        id: 1,
                        name: "test",
                        startDate: moment("2020-01-31"),
                        isComplete: false,
                        completionDate: null,
                        duration: null
                    }]
                } 
            };

            const actual = getPlotData(state);

            expect(actual).toEqual(expected);
        });
    });
    
    describe("Complete actions", () => {
        it("First day of the month", () => {
            const expected = [{
                id: "WIP",
                data: [{
                    x: "January",
                    y: 1
                }]
            }];

            const state = {
                date: {}, 
                filter: { 
                    actions: [{
                        id: 1,
                        name: "test",
                        startDate: moment("2020-01-01"),
                        isComplete: true,
                        completionDate: moment("2020-01-02"),
                        duration: moment.duration(1, "days")
                    }]
                } 
            };

            const actual = getPlotData(state);

            expect(actual).toEqual(expected);
        });

        it("Last day of the month", () => {
            const expected = [{
                id: "WIP",
                data: [{
                    x: "January",
                    y: 1
                }]
            }];

            const state = {
                date: {}, 
                filter: { 
                    actions: [{
                        id: 1,
                        name: "test",
                        startDate: moment("2020-01-31"),
                        isComplete: false,
                        completionDate: moment("2020-01-02"),
                        duration: moment.duration(1, "days")
                    }]
                } 
            };

            const actual = getPlotData(state);

            expect(actual).toEqual(expected);
        });
    });
});