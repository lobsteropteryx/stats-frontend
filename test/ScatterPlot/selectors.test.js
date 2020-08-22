import { getPlotData } from "../../app/ScatterPlot/selectors";

describe("Transforming chart data", () => {
    it("Returns an empty array when there are no actions", () => {
        const expected = [];
        const durations = [];
        const actual = getPlotData(durations);
        expect(actual).toEqual(expected);
    });
});