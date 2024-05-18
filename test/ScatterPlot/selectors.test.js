import { getPlotData } from "../../app/ScatterPlot/selectors";

describe("Scatter plot selector", () => {
    it("Returns an empty array when there are no cards", () => {
        const expected = [{
            id: "Cards Completed",
            data: []
        }];

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
                startColumn: { id: null, name: null},
                endColumn: {id: null, name: null},
                selectedLabels: [],
                cards: [] 
            } 
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Returns data elements from cards", () => {
        const expected = [{
            id: "Cards Completed",
            data: [{
                id: 1,
                name: "test",
                url: "https://trello.com/c/1",
                x: "2020-01-02",
                y: "1"
            }]
        }];

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
                selectedLabels: [],
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
                        date: new Date("2020-01-01T16:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: new Date("2020-01-02T16:00:00.000Z")
                    }]
                }]
            }
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });

    it("Filters incomplete cards", () => {
        const expected = [{
            id: "Cards Completed",
            data: []
        }];

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
                selectedLabels: [],
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
                        date: new Date("2020-01-01T16:00:00.000Z"),
                    }]
                }]
            }
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Filters by date", () => {
        const expected = [{
            id: "Cards Completed",
            data: []
        }];

        const state = { 
            date: {
                startDate: new Date("2020-01-02"),
                endDate: new Date("2020-01-02")
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
                    actions: [{
                        startColumn: {
                            id: "0",
                            name: "ToDo"
                        },
                        endColumn: {
                            id:"1",
                            name:"Doing"
                        },
                        date: new Date("2020-01-04T16:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: new Date("2020-01-05T16:00:00.000Z")
                    }]
                }]
            }
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });

    it("Filters by label", () => {
        const expected = [{
            id: "Cards Completed",
            data: []
        }];

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
                        date: new Date("2020-01-04T16:00:00.000Z"),
                    }, {
                        startColumn: {
                            id: "1",
                            name: "Doing"
                        },
                        endColumn: {
                            id:"2",
                            name:"Done"
                        },
                        date: new Date("2020-01-05T16:00:00.000Z")
                    }]
                }]
            }
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });
});