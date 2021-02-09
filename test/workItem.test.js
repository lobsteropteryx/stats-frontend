import moment from 'moment';
import { cardToWorkItem } from "../app/workItem";

describe("Converting cards to Work Items", () => {
   
    it("returns an incomplete work item, given a card with no actions", () => {
        const startId = "1";
        const endId = "2";

        const card = {
            id: "1",
            name: "card",
            actions: []
        };

        const expected = {
            id: "1",
            name: "card",
            isComplete: false,
            duration: null,
            startDate: null,
            completionDate: null
        };

        const actual = cardToWorkItem(card, startId, endId);
        expect(actual).toEqual(expected);
    });

    it("returns an incomplete work item, given a card with no matching actions", () => {
        const startId = "2";
        const endId = "3";

        const card = {
            id: "1",
            name: "card",
            actions: [
            {
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: moment("2020-04-02T16:00:00.000Z"),
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: false,
            duration: null,
            startDate: null,
            completionDate: null
        };

        const actual = cardToWorkItem(card, startId, endId);
        expect(actual).toEqual(expected);
    });

    it("returns an incomplete work item, given a card with a matching start action", () => {
        const startId = "1";
        const endId = "2";

        const card = {
            id: "1",
            name: "card",
            actions: [
            {
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: moment("2020-04-02T16:00:00.000Z"),
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: false,
            duration: null,
            startDate: moment("2020-04-02T16:00:00.000Z"),
            completionDate: null
        };

        const actual = cardToWorkItem(card, startId, endId);
        expect(actual).toEqual(expected);
    });

    it("returns an incomplete work item, given a card with a matching end action", () => {
        const startId = "1";
        const endId = "2";

        const card = {
            id: "1",
            name: "card",
            actions: [
            {
                startColumn: {
                    id: "1",
                    name: "Doing"
                },
                endColumn: {
                    id:"2",
                    name:"Done"
                },
                date: moment("2020-04-02T16:00:00.000Z"),
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: false,
            duration: null,
            startDate: null,
            completionDate: null 
        };

        const actual = cardToWorkItem(card, startId, endId);
        expect(actual).toEqual(expected);
    });

    it("returns a complete work item, given a card with two actions", () => {
        const startId = "1";
        const endId = "2";

        const card = {
            id: "1",
            name: "card",
            actions: [
            {
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: moment("2020-04-02T16:00:00.000Z"),
            },
            {
                startColumn: {
                    id: "1",
                    name: "Doing"
                },
                endColumn: {
                    id:"2",
                    name:"Done"
                },
                date: moment("2020-04-03T16:00:00.000Z")
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: true,
            duration: moment.duration(86400000),
            startDate: moment("2020-04-02T16:00:00.000Z"),
            completionDate: moment("2020-04-03T16:00:00.000Z")
        };

        const actual = cardToWorkItem(card, startId, endId);
        expect(actual).toEqual(expected);
    });
    
    it("returns the correct duration given a card with two actions in the wrong order", () => {
        const startId = "1";
        const endId = "2";

        const card = {
            id: "1",
            name: "card",
            actions: [
            {
                startColumn: {
                    id: "1",
                    name: "Doing"
                },
                endColumn: {
                    id:"2",
                    name:"Done"
                },
                date: moment("2020-04-03T16:00:00.000Z")
            },
            {
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: moment("2020-04-02T16:00:00.000Z"),
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: true,
            duration: moment.duration(86400000),
            startDate: moment("2020-04-02T16:00:00.000Z"),
            completionDate: moment("2020-04-03T16:00:00.000Z")
        };

        const actual = cardToWorkItem(card, startId, endId);
        expect(actual).toEqual(expected);
    });
    
    it("returns an incomplete work item given a card that was moved back", () => {
        const startId = "1";
        const endId = "2";

        const card = {
            id: "1",
            name: "card",
            actions: [
            {
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: moment("2020-04-01T16:00:00.000Z"),
            },
            {
                startColumn: {
                    id: "1",
                    name: "Doing"
                },
                endColumn: {
                    id:"2",
                    name:"Done"
                },
                date: moment("2020-04-02T16:00:00.000Z")
            },
            {
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: moment("2020-04-03T16:00:00.000Z"),
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: false,
            duration: null,
            startDate: moment("2020-04-01T16:00:00.000Z"),
            completionDate: null
        };

        const actual = cardToWorkItem(card, startId, endId);
        expect(actual).toEqual(expected);
    });
});