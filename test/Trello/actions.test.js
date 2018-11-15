import nock from 'nock';
import { mockStore } from '../mockStore';

import {
    initializeData,
    setTrelloToken,
    getBoards,
    selectBoard,
    fetchBoards,
    SET_TRELLO_TOKEN,
    GET_BOARDS,
    SELECT_BOARD,
    FETCH_BOARDS
} from '../../app/Trello/actions';


describe("Trello Auth", () => {
    it("sets a trello token", () => {
        expect(setTrelloToken('abc')).toEqual({
            type: SET_TRELLO_TOKEN, token: 'abc'
        });
    });

    it("initializes data", async () => {
        const boards = [{id: 1, name: 'my board'}];
        const token = 'abc';
        const store = mockStore({trello: {}});

        nock('https://api.trello.com')
            .get('/1/members/me/boards')
            .query(true)
            .reply(200, boards);

        await store.dispatch(initializeData(token));
        const actions = store.getActions();

        expect(actions[0]).toEqual({type: SET_TRELLO_TOKEN, token: token});
        expect(actions[1]).toEqual({type: GET_BOARDS, boards});
    });
});

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