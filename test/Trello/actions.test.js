import nock from 'nock';
import { mockStore } from '../mockStore';

import {
    INITIALIZE_DATA,
    initializeData,
    SET_TRELLO_TOKEN,
    setTrelloToken,
    GET_BOARDS,
    getBoards,
    SELECT_BOARD,
    selectBoard,
    FETCH_BOARDS,
    fetchBoards,
    GET_CARDS,
    getCards
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

describe("Trello Cards", () => {
    it("gets a list of trello cards", () => {
        const cards = [];
        expect(getCards(cards)).toEqual({
            type: GET_CARDS, cards
        });
    });
});