import moment from "moment"; 
import { getCsvData } from "../../../app/Filter/Query/csvExporter";

describe("Converting CSV", () => {
    it("Returns the correct data structure for a single card", async () => {

        global.URL.createObjectURL = jest.fn(() => "myUrl");

        jest.spyOn(global.Date.prototype, 'toISOString')
            .mockImplementationOnce(() => '2019-05-14');

        const expected = {
            content: "id,name,actions.startColumn.id,actions.startColumn.name,actions.endColumn.id,actions.endColumn.name,actions.date\n1,test,0,ToDo,1,Doing,1/1/2020",
            url: "myUrl",
            filename: "myBoard-2019-05-14.csv"
        };

        const boardName = "myBoard";
 
        const cards = [{
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
                date: moment("2020-01-01T16:00:00.000Z"),
            }]
        }];

        const actual = await getCsvData(cards, boardName);

        expect(actual).toEqual(expected);
    });
});