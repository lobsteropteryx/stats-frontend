import nock from 'nock';
import { mockStore } from '../mockStore';

import {
    getBoards,
    selectBoard,
    fetchBoards,
    GET_BOARDS,
    SELECT_BOARD,
    FETCH_BOARDS
} from '../../app/Trello/actions';

describe("Trello Boards", () => {
    it("gets a list of trello boards", () => {
        const boards = [];
        expect(getBoards(boards)).toEqual({
            type: GET_BOARDS, boards
        });
    });

    it("selects a board", () => {
        const board = {name: 'myBoard'};
        expect(selectBoard(board)).toEqual({
            type: SELECT_BOARD, board
        });
    });

    it("requests boards", async () => {
        const boards = [{id: 1, name: 'my board'}];

        const store = mockStore();

        nock('https://api.trello.com')
            .get('/1/members/me/boards')
            .query(true)
            .reply(200, boards);

        await store.dispatch(fetchBoards('apiKey', 'token'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({type: GET_BOARDS, boards});
    });
});