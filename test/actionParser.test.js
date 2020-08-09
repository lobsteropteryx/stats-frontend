import {createActionParser} from "../app/actionParser";

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
                },
                "date":"2020-04-02T16:00:00.000Z",
            },
            {
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
                },
                "date":"2020-04-03T16:00:00.000Z",
            }
        ];
        const expected = [{
            id: "1",
            duration: 86400000   
        }];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("filters out items from other columns", () => {
        const actions = [
            {
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
                },
                "date":"2020-04-02T16:00:00.000Z",
            },
            {
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
                },
                "date":"2020-04-03T16:00:00.000Z",
            },
            {
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
                },
                "date":"2020-04-04T16:00:00.000Z",
            }
        ];
        const expected = [{
            id: "1",
            duration: 86400000   
        }];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("filters out cards that are still in progress", () => {
        const actions = [
            {
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
                },
                "date":"2020-04-02T16:00:00.000Z"
            }
        ];
        const expected = [];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("handles cards that were moved back", () => {
        const actions = [
            {
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
                },
                "date":"2020-04-02T16:00:00.000Z"
            },
            {
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
                },
                "date":"2020-04-03T16:00:00.000Z",
            },
            {
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
                },
                "date":"2020-04-04T16:00:00.000Z",
            }
        ];
        const expected = [];
        const parse = createActionParser("1", "2");
        const actual = parse(actions);
        expect(actual).toEqual(expected);
    });
})