import { trelloData } from '../../app/Trello/reducer';
import { getBoards } from '../../app/Trello/actions';

describe("Reducer", () => {
    it("sets the default state", () => {
        const state = {foo: 'bar'};
        const action = { type: 'test' };
        expect(trelloAuth(state, action)).toEqual(state);
    });
});