import moment from "moment"; 
import { getHistogramData } from "../../app/Histogram/selectors";

describe("Transforming histogram data", () => {
    it("Returns an empty array when there are no cards", () => {
        const expected = [];

        const state = {
            date: {}, 
            filter: { 
                startColumn: { id: null, name: null },
                endColumn: { id: null, name: null },
                cards: [] 
            } 
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Returns data elements for a single card", () => {
        const expected = [{
            id: "1",
            value: 1
        }];

        const state = { 
            date: {},
            filter: {
                startColumn: { id: "1", name: "Doing" },
                endColumn: { id: "2", name: "Done" },
                cards: [{
                    id: 1,
                    name: "test",
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: moment("2020-01-01T00:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: moment("2020-01-02T00:00:00.000Z")
                    }]
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });

    it("Returns data elements from two cards", () => {
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
                startColumn: { id: "1", name: "Doing" },
                endColumn: { id: "2", name: "Done" },
                cards: [{
                    id: 1,
                    name: "test",
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: moment("2020-01-01T00:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: moment("2020-01-02T00:00:00.000Z")
                    }]
                }, {
                    id: 2,
                    name: "test 2",
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: moment("2020-01-02T00:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: moment("2020-01-04T00:00:00.000Z")
                    }]
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Filters incomplete cards", () => {
        const expected = [];

        const state = { 
            date: {},
            filter: {
                startColumn: { id: "1", name: "Doing" },
                endColumn: { id: "2", name: "Done" },
                cards: [{
                    id: 1,
                    name: "test",
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: moment("2020-01-01T00:00:00.000Z"),
                    }]
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Filters by date", () => {
        const expected = [];

        const state = { 
            date: {
                startDate: moment("2020-01-01"),
                endDate: moment("2020-01-02")
            },
            filter: {
                startColumn: { id: "1", name: "Doing" },
                endColumn: { id: "2", name: "Done" },
                cards: [{
                    id: 1,
                    name: "test",
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: moment("2020-01-03T00:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: moment("2020-01-04T00:00:00.000Z")
                    }]
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
});