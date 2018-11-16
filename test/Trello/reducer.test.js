import { trello } from '../../app/Trello/reducer';
import {
    setTrelloToken,
    getBoards,
    selectBoard,
    FETCH_BOARDS,
    FETCH_COLUMNS,
    getColumns
} from '../../app/Trello/actions';

describe("Authentication", () => {
    it("sets the trello token", () => {
        const state = {};
        const token = 'abc';
        const action = setTrelloToken(token);
        expect(trello(state, action)).toEqual({token});
    });
});

describe("Getting boards", () => {
    it("sets the default state", () => {
        const state = {boards: []};
        const action = { type: 'test' };
        expect(trello(state, action)).toEqual(state);
    });

    it("sets the list of boards", () => {
        const state = {};
        const boards = [{name: "a board"}];
        const expectedState = {isFetching: false, boards};
        const action = getBoards(boards);
        expect(trello(state, action)).toEqual(expectedState);
    });

    it("requests boards", async () => {
        const state = {};
        const expectedState = {isFetching: true};
        const action = {
            type: FETCH_BOARDS
        };
        expect(trello(state, action)).toEqual(expectedState);
    });
});

describe("Selecting a board", () => {
   it("Sets the selected board", () => {
       const state = {};
       const selectedBoard = {id: 1, name: 'selectedBoard'};
       const expectedState = {selectedBoard: selectedBoard};
       const action = selectBoard(selectedBoard);
       expect(trello(state, action)).toEqual(expectedState);
   }) ;
});

describe("Getting columns", () => {
    it("sets the default state", () => {
        const state = {columns: []};
        const action = { type: 'test' };
        expect(trello(state, action)).toEqual(state);
    });

    it("sets the list of columns", () => {
        const state = {};
        const columns = [{name: "a list"}];
        const expectedState = {isFetching: false, columns};
        const action = getColumns(columns);
        expect(trello(state, action)).toEqual(expectedState);
    });

    it("requests columns", async () => {
        const state = {selectedBoard: {value: 1}};
        const expectedState = {isFetching: true, selectedBoard: {value: 1}};
        const action = {
            type: FETCH_COLUMNS
        };
        expect(trello(state, action)).toEqual(expectedState);
    });
});