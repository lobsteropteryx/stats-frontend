import moment from "moment"; 
import { getPlotData } from "../../app/WipPlot/selectors";

describe("Transforming WIP data", () => {
    it("Returns an empty array when there are no actions", () => {
        const expected = [{
            id: "WIP",
            data: []
        }];

        const state = {
            date: {}, 
            filter: { 
                actions: [] 
            } 
        };

        const actual = getPlotData(state);

        expect(actual).toEqual(expected);
    });
});