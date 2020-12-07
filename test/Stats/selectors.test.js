import moment from "moment";
import { getPercentiles } from "../../app/Stats/selectors";

describe("Calculating percentiles", () => {
    it("Sets percentiles to 0 when there are no cards", () => {
        const expected = {
            n: 0,
            fifty: 0,
            seventyFive: 0,
            eightyFive: 0, 
            ninetyFive: 0 
        }

        const state = { 
            date: {}, 
            localFilter: { 
                startColumn: { id: null, name: null },
                endColumn: { id: null, name: null },
                cards: [] 
            } 
        };

        const actual = getPercentiles(state);

        expect(actual).toEqual(expected);
    });
    
    it("Calculates percentiles from a single completed card", () => {
        const expected = {
            n: 1,
            fifty: 1,
            seventyFive: 1,
            eightyFive: 1, 
            ninetyFive: 1 
        };

        const state = { 
            date: {},
            localFilter: {
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
                        date: moment("2020-01-01T16:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: moment("2020-01-02T16:00:00.000Z")
                    }]
                }]
            }
        };

        const actual = getPercentiles(state);

        expect(actual).toEqual(expected);
    });

    it("Calculates percentiles from two cards", () => {
        const expected = {
            n: 2,
            fifty: 1,
            seventyFive: 2,
            eightyFive: 2, 
            ninetyFive: 2 
        };

        const state = { 
            date: {},
            localFilter: {
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
                        date: moment("2020-01-01T16:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: moment("2020-01-02T16:00:00.000Z")
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
                        date: moment("2020-01-02T16:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: moment("2020-01-04T16:00:00.000Z")
                    }] 
                }]
            }
        };

        const actual = getPercentiles(state);

        expect(actual).toEqual(expected);
    });
    
    it("Filters percentiles to only completed cards", () => {
        const expected = {
            n: 1,
            fifty: 1,
            seventyFive: 1,
            eightyFive: 1, 
            ninetyFive: 1 
        };

        const state = {
            date: {
                startDate: null,
                endDate: null
            },
            localFilter: {
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
                        date: moment("2020-01-01T16:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: moment("2020-01-02T16:00:00.000Z")
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
                        date: moment("2020-01-02T16:00:00.000Z"),
                    }]
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
                startDate: moment("2020-01-01"),
                endDate: moment("2020-01-02")
            },
            localFilter: {
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
                        date: moment("2020-01-03T16:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: moment("2020-01-04T16:00:00.000Z")
                    }] 
                }]
            }
        };

        const actual = getPercentiles(state);

        expect(actual).toEqual(expected);
    });
});