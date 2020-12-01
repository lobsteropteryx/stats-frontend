import { ActionParser } from "../../app/Trello/actionParser";
import moment from 'moment';

describe("Parsing actions", () => {
    it("returns an empty list given no actions", () => {
        const actions = [];
        const expected = [];
        const parser = new ActionParser();
        const actual = parser.parseActions(actions);
        expect(actual).toEqual(expected);
    });

    it("returns one card, given two actions on the same card", () => {
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
            actions: [{
                startColumn: {id: "0", name: "ToDo"},
                endColumn: {id: "1", name: "Doing"},
                date: moment("2020-04-02T16:00:00.000Z"),
            }, {
                startColumn: {id: "1", name: "Doing"},
                endColumn: {id: "2", name: "Done"},
                date: moment("2020-04-03T16:00:00.000Z")
            }]
        }];

        const parser = new ActionParser();
        const actual = parser.parseActions(actions);
        expect(actual).toEqual(expected);
    });
    
    xit("returns two cards, given two actions", () => {
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
                        "id":"2",
                        "name":"Card 2",
                    },
                    "listBefore": {
                        "id":"1",
                        "name":"ToDo"
                    },
                    "listAfter": {
                        "id":"2",
                        "name":"Doing"
                    }
                },
                "date":"2020-04-03T16:00:00.000Z",
            }
        ];

        const expected = [{
            id: "1",
            name: "Card 1",
            actions: [{
                startColumn: {id: "1", name: "ToDo"},
                endColumn: {id: "2", name: "Doing"},
                startDate: moment("2020-04-02T16:00:00.000Z"),
                endDate: moment("2020-04-03T16:00:00.000Z")
            }]
        }, {
            id: "2",
            name: "Card 2",
            actions: [{
                startColumn: {id: "1", name: "ToDo"},
                endColumn: {id: "2", name: "Doing"},
                startDate: moment("2020-04-02T16:00:00.000Z"),
                endDate: moment("2020-04-03T16:00:00.000Z")
            }]
        }];

        const parser = new ActionParser();
        const actual = parser.parseActions(actions);
        expect(actual).toEqual(expected);
    });
});