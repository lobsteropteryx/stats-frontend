import { trello } from '../../app/Trello/reducer';
import {
    setTrelloToken,
    getBoards,
    setBoard,
    FETCH_BOARDS,
    FETCH_COLUMNS,
    FETCH_CARDS,
    FETCH_ACTIONS,
    getCards,
    getColumns,
    getActions,
    setStartColumn,
    setEndColumn,
    setStartDate,
    setEndDate
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
        const action = {type: 'test'};
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
    it("Sets the board and resets the selected columns", () => {
        const state = {startColumn: 'start', endColumn: 'ending'};
        const selectedBoard = {id: 1, name: 'selectedBoard'};
        const expectedState = {
            selectedBoard: selectedBoard,
            startColumn: null,
            endColumn: null
        };
        const action = setBoard(selectedBoard);
        expect(trello(state, action)).toEqual(expectedState);
    });
});

describe("Getting columns", () => {
    it("sets the default state", () => {
        const state = {columns: []};
        const action = {type: 'test'};
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

describe("Getting cards", () => {
    it("sets the default state", () => {
        const state = {cards: []};
        const action = {type: 'test'};
        expect(trello(state, action)).toEqual(state);
    });

    it("sets the list of cards", () => {
        const state = {};
        const cards = [{name: "a card"}];
        const expectedState = {isFetching: false, cards};
        const action = getCards(cards);
        expect(trello(state, action)).toEqual(expectedState);
    });

    it("requests cards", async () => {
        const state = {selectedBoard: {value: 1}};
        const expectedState = {isFetching: true, selectedBoard: {value: 1}};
        const action = {
            type: FETCH_CARDS
        };
        expect(trello(state, action)).toEqual(expectedState);
    });
});

describe("Selecting columns", () => {
    it("Sets the selected start column", () => {
        const state = {};
        const selectedColumn = {id: 1, name: 'selectedColumn'};
        const expectedState = {startColumn: selectedColumn};
        const action = setStartColumn(selectedColumn);
        expect(trello(state, action)).toEqual(expectedState);
    });

    it("Sets the selected end column", () => {
        const state = {};
        const selectedColumn = {id: 1, name: 'selectedColumn'};
        const expectedState = {endColumn: selectedColumn};
        const action = setEndColumn(selectedColumn);
        expect(trello(state, action)).toEqual(expectedState);
    });
});

describe("Dates", () => {
    it("sets the start date", () => {
        const state = {};
        const date = new Date('Jan 1, 2000');
        const action = setStartDate(date);
        const expectedState = {startDate: date};
        expect(trello(state, action)).toEqual(expectedState);
    });

    it("sets the end date", () => {
        const state = {};
        const date = new Date('Jan 1, 2000');
        const action = setEndDate(date);
        const expectedState = {endDate: date};
        expect(trello(state, action)).toEqual(expectedState);
    });
});

describe("Getting actions", () => {
    it("sets the default state", () => {
        const state = {actions: []};
        const action = {type: 'test'};
        expect(trello(state, action)).toEqual(state);
    });

    it("sets the list of actions", () => {
        const state = {};
        const actions = [{name: "an action"}];
        const expectedState = {isFetching: false, actions};
        const action = getActions(actions);
        expect(trello(state, action)).toEqual(expectedState);
    });

    it("requests actions", async () => {
        const state = {selectedBoard: {value: 1}};
        const expectedState = {isFetching: true, selectedBoard: {value: 1}};
        const action = {
            type: FETCH_ACTIONS
        };
        expect(trello(state, action)).toEqual(expectedState);
    });
});