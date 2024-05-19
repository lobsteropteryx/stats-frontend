import reducer from '../../app/Settings/settingsSlice';
import { setDisplayMode } from '../../app/Settings/settingsSlice';
import { HISTOGRAM, SCATTER } from '../../app/Settings/settingsSlice';

describe("Setting the display mode", () => {
    it("Sets the display mode to histogram", () => {
        const selectedMode = {label: "Histogram", value: HISTOGRAM};
        const state = {
            displayMode: {label: "Scatter Plot", value: SCATTER}
        };

        const nextState = {
            displayMode: selectedMode
        };
        
        const action = setDisplayMode(selectedMode);
        expect(reducer(state, action)).toEqual(nextState);
    });
});
