import moment from "moment"; 
import { getExportParameters } from "../../../../app/Filter/Query/QueryControls/selectors";

describe("Scatter plot selector", () => {
    it("Returns the correct data structure when there are no cards", () => {

        global.URL.createObjectURL = jest.fn(() => "myUrl");

        jest.spyOn(global.Date.prototype, 'toISOString')
            .mockImplementationOnce(() => '2019-05-14');

        const expected = {
            content: "[]",
            url: "myUrl",
            filename: "myBoard-2019-05-14"
        };

        const state = { 
            queryFilter: { 
                selectedBoard: {name: "myBoard"}
            },
            localFilter: {
                cards: []
            }
        };

        const actual = getExportParameters(state);

        expect(actual).toEqual(expected);
    });
});