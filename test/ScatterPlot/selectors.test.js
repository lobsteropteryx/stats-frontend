import moment from "moment"; 
import { getPlotData } from "../../app/ScatterPlot/selectors";

describe("Transforming chart data", () => {
    it("Returns an empty array when there are no actions", () => {
        const expected = [];

        const state = { actions: [] };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Returns data elements from actions", () => {
        const expected = [{
            id: 1,
            name: "test",
            url: "https://trello.com/c/1",
            x: "2020-01-01",
            y: "1"
        }];

        const state = { 
            actions: [{
                id: 1,
                name: "test",
                completionDate: moment("2020-01-01"),
                duration: moment.duration(1, "days")
            }]
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });
});