import { getCsvData } from "../../../app/Filter/Query/csvExporter";
import { ActionType, Card } from "@lobsteropteryx/stats-models";

describe("Converting CSV", () => {
    it("Returns the correct data structure for a single card with one action", async () => {

        global.URL.createObjectURL = jest.fn(() => "myUrl");

        jest.spyOn(global.Date.prototype, 'toISOString')
            .mockImplementationOnce(() => '2019-05-14');

        const expected = {
            content: `id,name,actions.type,actions.startColumn.id,actions.startColumn.name,actions.endColumn.id,actions.endColumn.name,actions.date
1,test,updateCard,0,ToDo,1,Doing,01/01/2020`,
            url: "myUrl",
            filename: "myBoard-2019-05-14.csv"
        };

        const boardName = "myBoard";
 
        const cards = [{
            id: "1",
            name: "test",
            labels: [{
                id: '1',
                name: 'myLabel',
                color: 'red'
            }],
            actions: [{
                type: "updateCard" as ActionType,
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-01-01T16:00:00.000Z",
            }]
        }];

        const actual = await getCsvData(cards, boardName);

        expect(actual).toEqual(expected);
    });
    
    it("Returns the correct data structure for a single card with two actions", async () => {

        global.URL.createObjectURL = jest.fn(() => "myUrl");

        jest.spyOn(global.Date.prototype, 'toISOString')
            .mockImplementationOnce(() => '2019-05-14');

        const expected = {
            content: `id,name,actions.type,actions.startColumn.id,actions.startColumn.name,actions.endColumn.id,actions.endColumn.name,actions.date
1,test,createCard,,,0,ToDo,01/01/2020
1,test,updateCard,0,ToDo,1,Doing,01/02/2020`,
            url: "myUrl",
            filename: "myBoard-2019-05-14.csv"
        };

        const boardName = "myBoard";
 
        const cards:Card[] = [{
            id: "1",
            name: "test",
            labels: [{
                id: '1',
                name: 'myLabel',
                color: 'red'
            }],
            actions: [{
                type: "createCard" as ActionType,
                startColumn: {
                    id: null,
                    name: null 
                },
                endColumn: {
                    id:"0",
                    name:"ToDo"
                },
                date: "2020-01-01T16:00:00.000Z",
            }, {
                type: "updateCard" as ActionType,
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-01-02T16:00:00.000Z",
            }]
        }];

        const actual = await getCsvData(cards, boardName);

        expect(actual).toEqual(expected);
    });

    it("Sorts data by card id and date", async () => {

        global.URL.createObjectURL = jest.fn(() => "myUrl");

        jest.spyOn(global.Date.prototype, 'toISOString')
            .mockImplementationOnce(() => '2019-05-14');

        const expected = {
            content: `id,name,actions.type,actions.startColumn.id,actions.startColumn.name,actions.endColumn.id,actions.endColumn.name,actions.date
1,test,createCard,,,0,ToDo,12/31/2019
1,test,updateCard,0,ToDo,1,Doing,01/01/2020
2,test2,createCard,,,0,ToDo,11/01/2019`,
            url: "myUrl",
            filename: "myBoard-2019-05-14.csv"
        };

        const boardName = "myBoard";
 
        const cards:Card[] = [{
            id: "2",
            name: "test2",
            labels: [{
                id: '1',
                name: 'myLabel',
                color: 'red'
            }],
            actions: [{
                type: "createCard" as ActionType,
                startColumn: {
                    id: null,
                    name: null 
                },
                endColumn: {
                    id:"0",
                    name:"ToDo"
                },
                date: "2019-11-01T16:00:00.000Z",
            }]
         }, {
            id: "1",
            name: "test",
            labels: [{
                id: '1',
                name: 'myLabel',
                color: 'red'
            }],
            actions: [{
                type: "createCard" as ActionType,
                startColumn: {
                    id: null,
                    name: null 
                },
                endColumn: {
                    id:"0",
                    name:"ToDo"
                },
                date: "2019-12-31T16:00:00.000Z",
            }, {
                type: "updateCard" as ActionType,
                startColumn: {
                    id: "0",
                    name: "ToDo"
                },
                endColumn: {
                    id:"1",
                    name:"Doing"
                },
                date: "2020-01-01T16:00:00.000Z",
            }]
        }];

        const actual = await getCsvData(cards, boardName);

        expect(actual).toEqual(expected);
    });
});