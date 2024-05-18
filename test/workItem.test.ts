import { cardToWorkItem } from "../app/workItem";
import { ActionType, Card } from '../app/card';

describe("Converting cards to Work Items", () => {
    it("returns an incomplete work item, given a card with no actions", () => {
        const startId = "1";
        const endId = "2";

        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }, {
            id: "2",
            name: "Done"
        }]

        const card = {
            id: "1",
            name: "card",
            labels: [],
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

        const actual = cardToWorkItem(card, columns, startId, endId);
        expect(actual).toEqual(expected);
    });

    it("returns an incomplete work item, given a card with no matching actions", () => {
        const startId = "2";
        const endId = "3";

        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }, {
            id: "2",
            name: "Done"
        }]

        const card = {
            id: "1",
            name: "card",
            labels: [],
            actions: [
            {
                type: undefined,
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-04-02T16:00:00.000Z",
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

        const actual = cardToWorkItem(card, columns, startId, endId);
        expect(actual).toEqual(expected);
    });

    it("returns an incomplete work item, given a card with a matching start action", () => {
        const startId = "1";
        const endId = "2";

        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }, {
            id: "2",
            name: "Done"
        }]

        const card = {
            id: "1",
            name: "card",
            labels: [],
            actions: [
            {
                type: undefined,
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-04-02T16:00:00.000Z",
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: false,
            duration: null,
            startDate: "2020-04-02T16:00:00.000Z",
            completionDate: null
        };

        const actual = cardToWorkItem(card, columns, startId, endId);
        expect(actual).toEqual(expected);
    });

    it("returns an incomplete work item, given a card with a matching end action", () => {
        const startId = "1";
        const endId = "2";

        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }, {
            id: "2",
            name: "Done"
        }]

        const card = {
            id: "1",
            name: "card",
            labels: [],
            actions: [
            {
                type: undefined,
                startColumn: {
                    id: "1",
                    name: "Doing"
                },
                endColumn: {
                    id:"2",
                    name:"Done"
                },
                date: "2020-04-02T16:00:00.000Z",
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

        const actual = cardToWorkItem(card, columns, startId, endId);
        expect(actual).toEqual(expected);
    });

    it("returns a complete work item, given a card with two actions", () => {
        const startId = "1";
        const endId = "2";

        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }, {
            id: "2",
            name: "Done"
        }]

        const card = {
            id: "1",
            name: "card",
            labels: [],
            actions: [
            {
                type: undefined,
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-04-02T16:00:00.000Z",
            },
            {
                type: undefined,
                startColumn: {
                    id: "1",
                    name: "Doing"
                },
                endColumn: {
                    id:"2",
                    name:"Done"
                },
                date: "2020-04-03T16:00:00.000Z"
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: true,
            duration: 1,
            startDate: "2020-04-02T16:00:00.000Z",
            completionDate: "2020-04-03T16:00:00.000Z"
        };

        const actual = cardToWorkItem(card, columns, startId, endId);
        expect(actual).toEqual(expected);
    });
    
    it("returns the correct duration given a card with two actions in the wrong order", () => {
        const startId = "1";
        const endId = "2";

        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }, {
            id: "2",
            name: "Done"
        }]

        const card = {
            id: "1",
            name: "card",
            labels: [],
            actions: [
            {
                type: undefined,
                startColumn: {
                    id: "1",
                    name: "Doing"
                },
                endColumn: {
                    id:"2",
                    name:"Done"
                },
                date: "2020-04-03T16:00:00.000Z"
            },
            {
                type: undefined,
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-04-02T16:00:00.000Z",
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: true,
            duration: 1,
            startDate: "2020-04-02T16:00:00.000Z",
            completionDate: "2020-04-03T16:00:00.000Z"
        };

        const actual = cardToWorkItem(card, columns, startId, endId);
        expect(actual).toEqual(expected);
    });
    
    it("returns an incomplete work item given a card that was moved back", () => {
        const startId = "1";
        const endId = "2";

        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }, {
            id: "2",
            name: "Done"
        }]

        const card:Card = {
            id: "1",
            name: "card",
            labels: [],
            actions: [{
                type: undefined,
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-04-01T16:00:00.000Z",
            },
            {
                type: undefined,
                startColumn: {
                    id: "1",
                    name: "Doing"
                },
                endColumn: {
                    id:"2",
                    name:"Done"
                },
                date: "2020-04-02T16:00:00.000Z"
            },
            {
                type: undefined,
                startColumn: {
                    id: "2",
                    name: "Done"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-04-03T16:00:00.000Z",
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: false,
            duration: null,
            startDate: "2020-04-01T16:00:00.000Z",
            completionDate: null
        };

        const actual = cardToWorkItem(card, columns, startId, endId);
        expect(actual).toEqual(expected);
    });
    
    it("returns an incomplete work item given a card that was moved back and closed", () => {
        const startId = "1";
        const endId = "2";

        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }, {
            id: "2",
            name: "Done"
        }]

        const card:Card = {
            id: "1",
            name: "card",
            labels: [],
            actions: [
            {
                type: "cardCreated" as ActionType,
                startColumn: {
                    id: null,
                    name: null 
                },
                endColumn: {
                    id:"0",
                    name:"ToDo"
                },
                date: "2020-04-01T16:00:00.000Z",
            },
            {
                type: "cardMoved" as ActionType,
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-04-01T16:00:00.000Z",
            },
            {
                type: "cardMoved" as ActionType,
                startColumn: {
                    id: "1",
                    name: "Doing"
                },
                endColumn: {
                    id:"2",
                    name:"Done"
                },
                date: "2020-04-02T16:00:00.000Z"
            },
            {
                type: "cardMoved" as ActionType,
                startColumn: {
                    id: "2",
                    name: "Done"
                },
                endColumn: {
                    id: "1",
                    name:"Doing"
                },
                date: "2020-04-03T16:00:00.000Z",
            },
            {
                type: "cardClosed" as ActionType,
                startColumn: {
                    id: null, 
                    name: null 
                },
                endColumn: {
                    id: "1",
                    name:"Doing"
                },
                date: "2020-04-04T16:00:00.000Z",
            }
        ]};

        const expected = {
            id: "1",
            name: "card",
            isComplete: false,
            duration: null,
            startDate: "2020-04-01T16:00:00.000Z",
            completionDate: null
        };

        const actual = cardToWorkItem(card, columns, startId, endId);
        expect(actual).toEqual(expected);
    });
});