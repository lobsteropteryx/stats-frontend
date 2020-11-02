import {createActionParser} from "../app/actionParser";
import moment from 'moment';

describe("Parsing actions", () => {
    it("returns an empty list given no actions", () => {
        const actions = [];
        const expected = [];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("returns a single item, given two actions", () => {
        const actions = [
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"0",
                        "name":"ToDo"
                    },
                    "listAfter": {
                        "id":"1",
                        "name":"Doing"
                    }
                },
                "date":"2020-04-02T16:00:00.000Z",
            },
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"1",
                        "name":"Doing"
                    },
                    "listAfter": {
                        "id":"2",
                        "name":"Done"
                    }
                },
                "date":"2020-04-03T16:00:00.000Z",
            }
        ];
        const expected = [{
            id: "1",
            name: "Card 1",
            isComplete: true,
            duration: moment.duration(86400000),
            startDate: moment("2020-04-02T16:00:00.000Z"),
            completionDate: moment("2020-04-03T16:00:00.000Z")
        }];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("returns correct duration for two actions out of order", () => {
        const actions = [
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"1",
                        "name":"Doing"
                    },
                    "listAfter": {
                        "id":"2",
                        "name":"Done"
                    }
                },
                "date":"2020-04-03T16:00:00.000Z",
            },
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"0",
                        "name":"ToDo"
                    },
                    "listAfter": {
                        "id":"1",
                        "name":"Doing"
                    }
                },
                "date":"2020-04-02T16:00:00.000Z",
            }
        ];
        const expected = [{
            id: "1",
            name: "Card 1",
            isComplete: true,
            duration: moment.duration(86400000),
            startDate: moment("2020-04-02T16:00:00.000Z"),
            completionDate: moment("2020-04-03T16:00:00.000Z")   
        }];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("filters out items from other columns", () => {
        const actions = [
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"0",
                        "name":"ToDo"
                    },
                    "listAfter": {
                        "id":"1",
                        "name":"Doing"
                    }
                },
                "date":"2020-04-02T16:00:00.000Z",
            },
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"1",
                        "name":"Doing"
                    },
                    "listAfter": {
                        "id":"2",
                        "name":"Done"
                    }
                },
                "date":"2020-04-03T16:00:00.000Z",
            },
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"2",
                        "name":"Done"
                    },
                    "listAfter": {
                        "id":"3",
                        "name":"Demo'd"
                    }
                },
                "date":"2020-04-04T16:00:00.000Z",
            }
        ];
        const expected = [{
            id: "1",
            name: "Card 1",
            isComplete: true,
            duration: moment.duration(86400000),
            startDate: moment("2020-04-02T16:00:00.000Z"),
            completionDate: moment("2020-04-03T16:00:00.000Z")
        }];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("returns an empty list when all actions are on other columns", () => {
        const actions = [
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"2",
                        "name":"Done"
                    },
                    "listAfter": {
                        "id":"3",
                        "name":"Demo'd"
                    }
                },
                "date":"2020-04-02T16:00:00.000Z",
            }
        ];
        const expected = [];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("marks cards that are still in progress as incomplete", () => {
        const actions = [
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"0",
                        "name":"ToDo"
                    },
                    "listAfter": {
                        "id":"1",
                        "name":"Doing"
                    }
                },
                "date":"2020-04-02T16:00:00.000Z"
            }
        ];
        const expected = [{
            id: "1",
            name: "Card 1",
            isComplete: false,
            duration: null,
            startDate: moment("2020-04-02T16:00:00.000Z"),
            completionDate: null
        }];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("filters out cards that were moved back", () => {
        const actions = [
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"0",
                        "name":"ToDo"
                    },
                    "listAfter": {
                        "id":"1",
                        "name":"Doing"
                    }
                },
                "date":"2020-04-02T16:00:00.000Z"
            },
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"1",
                        "name":"Doing"
                    },
                    "listAfter": {
                        "id":"2",
                        "name":"Done"
                    }
                },
                "date":"2020-04-03T16:00:00.000Z",
            },
            {
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"2",
                        "name":"Done"
                    },
                    "listAfter": {
                        "id":"1",
                        "name":"Doing"
                    }
                },
                "date":"2020-04-04T16:00:00.000Z",
            }
        ];
        
        const expected = [{
            id: "1",
            name: "Card 1",
            isComplete: false,
            duration: null,
            startDate: moment("2020-04-02T16:00:00.000Z"),
            completionDate: null
        }];

        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
});