import { trelloAuth } from '../../app/AuthPortal/reducer';
import { setTrelloToken } from '../../app/AuthPortal/actions';

describe("Reducer", () => {
    it("sets the default state", () => {
        const state = {foo: 'bar'};
        const action = { type: 'test' };
        expect(trelloAuth(state, action)).toEqual(state);
    });

    it("sets the trello token", () => {
        const state = {};
        const token = 'abc';
        const action = setTrelloToken(token);
        expect(trelloAuth(state, action)).toEqual({trelloToken: token});
    });
});