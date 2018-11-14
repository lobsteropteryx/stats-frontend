import { setTrelloToken, SET_TRELLO_TOKEN } from '../../app/AuthPortal/actions';

describe("Actions", () => {
    it("sets a trello token", () => {
        expect(setTrelloToken('abc')).toEqual({
            type: SET_TRELLO_TOKEN, token: 'abc'
        });
    });
});