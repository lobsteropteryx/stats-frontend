import moment from "moment"; 
import { getHistogramData } from "../../app/Histogram/selectors";

describe("Transforming histogram data", () => {
    it("Returns an empty array when there are no actions", () => {
        const expected = [];

        const state = { 
            filter: { 
                actions: [] 
            } 
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
    
    it("Returns data elements from a single action", () => {
        const expected = [{
            id: "1",
            value: 1
        }];

        const state = { 
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(1, "days")
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });

    it("Returns data elements from actions", () => {
        const expected = [
        {
            id: "1",
            value: 1
        }, 
        {
            id: "2",
            value: 1
        }];

        const state = { 
            filter: {
                actions: [{
                    id: 1,
                    name: "test",
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(1, "days")
                }, {
                    id: 2,
                    name: "test2",
                    completionDate: moment("2020-01-01"),
                    duration: moment.duration(2, "days")
                }]
            }
        };

        const actual = getHistogramData(state);

        expect(actual).toEqual(expected);
    });
});