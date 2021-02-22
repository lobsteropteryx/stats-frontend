import { parseTrelloCards } from "../../app/Trello/parser";
import moment from 'moment';

describe("Parsing cards", () => {
    it("returns an empty list given no cards", () => {
        const cards = [];
        const expected = [];
        const actual = parseTrelloCards(cards);
        expect(actual).toEqual(expected);
    });

    it("parses one card with two actions", () => {
        const cards = [
            {
                "id": "1",
                "name": "Card 1",
                "actions": [{
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
                }]
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

        const actual = parseTrelloCards(cards);
        expect(actual).toEqual(expected);
    });
    
    it("parses two cards with a single action on each", () => {
        const cards = [
            {
                "id": "1",
                "name": "Card 1",
                "actions": [{
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
                }]
            },
            {
                "id": "2",
                "name": "Card 2",
                "actions": [{
                    "data": {
                        "card": {
                            "id":"2",
                            "name":"Card 2",
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
                    "date":"2020-04-03T16:00:00.000Z",
                }]
            }
        ];

        const expected = [{
            id: "1",
            name: "Card 1",
            actions: [{
                startColumn: {id: "0", name: "ToDo"},
                endColumn: {id: "1", name: "Doing"},
                date: moment("2020-04-02T16:00:00.000Z"),
            }]
        }, {
            id: "2",
            name: "Card 2",
            actions: [{
                startColumn: {id: "0", name: "ToDo"},
                endColumn: {id: "1", name: "Doing"},
                date: moment("2020-04-03T16:00:00.000Z"),
            }]
        }];

        const actual = parseTrelloCards(cards);
        expect(actual).toEqual(expected);
    });
});