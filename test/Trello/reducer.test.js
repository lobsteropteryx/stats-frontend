import { trelloData } from '../../app/Trello/reducer';
import { getBoards } from '../../app/Trello/actions';

describe("Reducer", () => {
    it("sets the default state", () => {
        const state = {boards: []};
        const action = { type: 'test' };
        expect(trelloData(state, action)).toEqual(state);
    });
});