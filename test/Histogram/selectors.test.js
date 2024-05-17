import dayjs from "dayjs";
import { getHistogramData } from "../../app/Histogram/selectors";

describe("Transforming histogram data", () => {
    it("Returns an empty array when there are no cards", () => {
        const expected = [];

        const state = {
            date: {}, 
            localFilter: { 
                columns: [{
                    id: "0",
                    name: "ToDo"
                }, {
                    id: "1",
                    name: "Doing"
                }, {
                    id: "2",
                    name: "Done"
                }],
                startColumn: { id: null, name: null },
                endColumn: { id: null, name: null },
                selectedLabels: [],
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
            localFilter: {
                columns: [{
                    id: "0",
                    name: "ToDo"
                }, {
                    id: "1",
                    name: "Doing"
                }, {
                    id: "2",
                    name: "Done"
                }],
                startColumn: { id: "1", name: "Doing" },
                endColumn: { id: "2", name: "Done" },
                selectedLabels: [],
                cards: [{
                    id: 1,
                    name: "test",
                    labels: [],
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: dayjs("2020-01-01T00:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: dayjs("2020-01-02T00:00:00.000Z")
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
            localFilter: {
                columns: [{
                    id: "0",
                    name: "ToDo"
                }, {
                    id: "1",
                    name: "Doing"
                }, {
                    id: "2",
                    name: "Done"
                }],
                startColumn: { id: "1", name: "Doing" },
                endColumn: { id: "2", name: "Done" },
                selectedLabels: [],
                cards: [{
                    id: 1,
                    name: "test",
                    labels: [],
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: dayjs("2020-01-01T00:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: dayjs("2020-01-02T00:00:00.000Z")
                    }]
                }, {
                    id: 2,
                    name: "test 2",
                    labels: [],
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: dayjs("2020-01-02T00:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: dayjs("2020-01-04T00:00:00.000Z")
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
            localFilter: {
                columns: [{
                    id: "0",
                    name: "ToDo"
                }, {
                    id: "1",
                    name: "Doing"
                }, {
                    id: "2",
                    name: "Done"
                }],
                startColumn: { id: "1", name: "Doing" },
                endColumn: { id: "2", name: "Done" },
                selectedLabels: [],
                cards: [{
                    id: 1,
                    name: "test",
                    labels: [],
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: dayjs("2020-01-01T00:00:00.000Z"),
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
                startDate: dayjs("2020-01-01"),
                endDate: dayjs("2020-01-02")
            },
            localFilter: {
                columns: [{
                    id: "0",
                    name: "ToDo"
                }, {
                    id: "1",
                    name: "Doing"
                }, {
                    id: "2",
                    name: "Done"
                }],
                startColumn: { id: "1", name: "Doing" },
                endColumn: { id: "2", name: "Done" },
                selectedLabels: [],
                cards: [{
                    id: 1,
                    name: "test",
                    labels: [],
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: dayjs("2020-01-03T00:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: dayjs("2020-01-04T00:00:00.000Z")
                    }]
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });

    it("Filters by label", () => {
        const expected = [];

        const state = { 
            date: {
                startDate: null,
                endDate: null 
            },
            localFilter: {
                columns: [{
                    id: "0",
                    name: "ToDo"
                }, {
                    id: "1",
                    name: "Doing"
                }, {
                    id: "2",
                    name: "Done"
                }],
                startColumn: { id: "1", name: "Doing" },
                endColumn: { id: "2", name: "Done" },
                selectedLabels: [{
                    id: '1',
                    name: 'defect',
                    color: 'red'
                }],
                cards: [{
                    id: 1,
                    name: "test",
                    labels: [],
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: dayjs("2020-01-03T00:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: dayjs("2020-01-04T00:00:00.000Z")
                    }]
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
});