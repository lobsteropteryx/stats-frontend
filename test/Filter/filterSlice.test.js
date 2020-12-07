import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, { fetchBoards, fetchActionsForBoard } from '../../app/Filter/filterSlice';
import {
    setTrelloToken,
    fetchPending,
    fetchComplete,
    setBoards,
    selectBoard,
    setColumns,
    setCards,
    setStartColumn,
    setEndColumn
} from '../../app/Filter/filterSlice';

const mockStore = configureMockStore([thunk]);

describe("Authentication", () => {
    it("sets the trello token", () => {
        const state = {};
        const token = 'abc';
        const action = setTrelloToken(token);
        expect(reducer(state, action)).toEqual({token});
    });
});

describe("Showing fetch state", () => {
    it("shows fetch is pending", () => {
        const state = {};
        const expectedState = {isFetching: true};
        const action = fetchPending();
        expect(reducer(state, action)).toEqual(expectedState);
    });
    
    it("shows fetch is complete", () => {
        const state = {};
        const expectedState = {isFetching: false};
        const action = fetchComplete();
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Setting boards", () => {
    it("sets the list of boards", () => {
        const state = {};
        const boards = [{name: "a board"}];
        const expectedState = {boards};
        const action = setBoards(boards);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Selecting a board", () => {
    it("Sets the board and resets the selected columns", () => {
        const state = {startColumn: 'start', endColumn: 'ending'};
        const selectedBoard = {id: 1, name: 'selectedBoard'};
        const expectedState = {
            selectedBoard: selectedBoard,
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null } 
        };
        const action = selectBoard(selectedBoard);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Setting columns", () => {
    it("sets the list of columns", () => {
        const state = {};
        const columns = [{name: "a list"}];
        const expectedState = {columns};
        const action = setColumns(columns);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Selecting columns", () => {
    it("Sets the selected start column", () => {
        const state = {};
        const selectedColumn = {value: 1, label: 'selectedColumn'};
        const expectedState = {startColumn: {id: 1, name: 'selectedColumn'}};
        const action = setStartColumn(selectedColumn);
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it("Sets the selected end column", () => {
        const state = {};
        const selectedColumn = {value: 1, label: 'selectedColumn'};
        const expectedState = {endColumn: {id: 1, name: 'selectedColumn'}};
        const action = setEndColumn(selectedColumn);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Setting cards", () => {
    it("sets the list of cards", () => {
        const state = {};
        const cards = [{name: "an action"}];
        const expectedState = {cards};
        const action = setCards(cards);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Fetching data from API", () => {
    it("fetches boards", async () => {
        const state = {};
        const boards = [];

        const expectedActions = [
            fetchPending(),
            setBoards(boards),
            fetchComplete()
        ];
            
        const apiClient = {
            getBoards: () => {
                return boards;
            }
        };

        const store = mockStore(state);

        const actionCreator = fetchBoards(apiClient);
        await actionCreator(store.dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fetches actions", async () => {
        const state = {
            columns: [
                {id: "1", name: "ToDo"},
                {id: "2", name: "Doing"},
                {id: "3", name: "Done"}
            ]
        };
        const boardId = "board";
        const cards = [];

        const expectedActions = [
            fetchPending(),
            setCards(cards),
            fetchComplete()
        ];
            
        const apiClient = {
            getActionsForBoard: (boardId) => {
                return cards;
            }
        };

        const store = mockStore(state);

        const actionCreator = fetchActionsForBoard(apiClient, boardId);
        await actionCreator(store.dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    });
});