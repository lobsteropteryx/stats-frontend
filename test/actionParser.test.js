import ActionParser from "../app/actionParser";

describe("Parsing actions", () => {
    it("returns an empty list given no actions", () => {
        const actions = [];
        const expected = [];
        const actionParser = new ActionParser("1", "2");
        const actual = actionParser.parse(actions);
        expect(actual).toEqual(expected);
    });
    
    it("returns a single item, give two actions", () => {
        const actions = [
            {
                "card": {
                    "id":"1",
                    "name":"Card 1",
                },
                "listBefore": {
                    "id":"1",
                    "name":"ToDo"
                },
                "listAfter": {
                    "id":"2",
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
                    "id":"2",
                    "name":"Doing"
                },
                "listAfter": {
                    "id":"3",
                    "name":"Done"
                },
                "date":"2020-04-03T16:00:00.000Z",
            }
        ];
        const expected = [{
            id: "1",
            duration: 86400000   
        }];
        const actionParser = new ActionParser("1", "2");
        const actual = actionParser.parse(actions);;
        expect(actual).toEqual(expected);
    });
})