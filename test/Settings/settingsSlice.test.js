import reducer from '../../app/Settings/settingsSlice';
import { setDisplayMode } from '../../app/Settings/settingsSlice';
import { HISTOGRAM, SCATTER } from '../../app/Settings/settingsSlice';

describe("Setting the display mode", () => {
    it("Sets the display mode to histogram", () => {
        const state = {
            displayMode: SCATTER
        };

        const nextState = {
            displayMode: HISTOGRAM 
        };
        
        const action = setDisplayMode(HISTOGRAM);
        expect(reducer(state, action)).toEqual(nextState);
    });
});
