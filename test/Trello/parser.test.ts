import { parseTrelloCards } from "../../app/Trello/parser";
import { Card as TrelloCard, ActionType } from "../../app/Trello/types";
import moment from 'moment';

describe("Parsing cards", () => {
    it("returns an empty list given no cards", () => {
        const cards = [];
        const expected = [];
        const actual = parseTrelloCards(cards);
        expect(actual).toEqual(expected);
    });

    it("parses a card with a label", () => {

        const cards = [
            {
                "id": "1",
                "name": "Card 1",
                "labels": [{
                    "id": "1",
                    "name": "my label",
                    "color": "red"
                }],
                "actions": []
            }
        ];

        const expected = [{
            id: "1",
            name: "Card 1",
            labels: [{
                id: "1",
                name: "my label",
                color: "red"
            }],
            actions: []
        }];

        const actual = parseTrelloCards(cards);
        expect(actual).toEqual(expected);
    });

    it("parses one card with two actions", () => {
        const cards: TrelloCard[] = [
            {
                "id": "1",
                "name": "Card 1",
                "labels": [],
                "actions": [{
                    "type": "updateCard" as ActionType,
                    "data": {
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
                    "type": "updateCard" as ActionType,
                    "data": {
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
            labels: [],
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
        const cards = [{
                "id": "1",
                "name": "Card 1",
                "labels": [],
                "actions": [{
                    "type": "updateCard" as ActionType,
                    "data": {
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
            },{
                "id": "2",
                "name": "Card 2",
                "labels": [],
                "actions": [{
                    "type": "updateCard" as ActionType,
                    "data": {
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
            }];

        const expected = [{
            id: "1",
            name: "Card 1",
            labels: [],
            actions: [{
                startColumn: {id: "0", name: "ToDo"},
                endColumn: {id: "1", name: "Doing"},
                date: moment("2020-04-02T16:00:00.000Z"),
            }]
        }, {
            id: "2",
            name: "Card 2",
            labels: [],
            actions: [{
                startColumn: {id: "0", name: "ToDo"},
                endColumn: {id: "1", name: "Doing"},
                date: moment("2020-04-03T16:00:00.000Z"),
            }]
        }];

        const actual = parseTrelloCards(cards);
        expect(actual).toEqual(expected);
    });

    it("filters out actions other than updateCard", () => {
        const cards = [
            {
                "id": "1",
                "name": "Card 1",
                "labels": [],
                "actions": [{
                    "type": "updateCard" as ActionType,
                    "data": {
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
                    "type": "createCard" as ActionType,
                    "data": {
                        "list": {
                            "id":"1",
                            "name":"List 1",
                        },
                    },
                    "date":"2020-04-01T16:00:00.000Z",
                }, {
                    "type": "moveCardToBoard" as ActionType,
                    "data": {
                        "list": {
                            "id":"1",
                            "name":"List 1",
                        },
                    },
                    "date":"2020-04-01T16:00:00.000Z",
                }]
            }
        ];

        const expected = [{
            id: "1",
            name: "Card 1",
            labels: [],
            actions: [{
                startColumn: {id: "0", name: "ToDo"},
                endColumn: {id: "1", name: "Doing"},
                date: moment("2020-04-02T16:00:00.000Z"),
            }]
        }];

        const actual = parseTrelloCards(cards);
        expect(actual).toEqual(expected);
    });
});