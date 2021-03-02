import moment from 'moment';
import { wasMovedBack } from "../app/actionFilter";

describe("Cards moving backwards", () => {
    it("returns false when a card moves forwards", () => {
        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }];

        const action = {
            startColumn: {
                id: "0",
                name: "ToDo"
            },
            endColumn: {
                id:"1",
                name:"Doing"
            },
            date: moment("2020-04-02T16:00:00.000Z"),
        };

        expect(wasMovedBack(action, columns)).toEqual(false); 
    })
    
    it("returns true when a card moves backwards", () => {
        const columns = [{
            id: "0",
            name: "ToDo"
        }, {
            id: "1",
            name: "Doing"
        }];

        const action = {
            startColumn: {
                id: "1",
                name:"Doing"
            },
            endColumn: {
                id: "0",
                name: "ToDo"
            },
            date: moment("2020-04-02T16:00:00.000Z"),
        };

        expect(wasMovedBack(action, columns)).toEqual(true); 
    })
});