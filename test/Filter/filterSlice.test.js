import reducer from '../../app/Filter/filterSlice';
import {
    setTrelloToken,
    fetchPending,
    fetchComplete,
    setBoards,
    selectBoard,
    setColumns,
    setActions,
    setStartColumn,
    setEndColumn,
    setStartDate,
    setEndDate
} from '../../app/Filter/filterSlice';

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
            startColumn: {},
            endColumn: {} 
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
        const selectedColumn = {id: 1, name: 'selectedColumn'};
        const expectedState = {startColumn: selectedColumn};
        const action = setStartColumn(selectedColumn);
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it("Sets the selected end column", () => {
        const state = {};
        const selectedColumn = {id: 1, name: 'selectedColumn'};
        const expectedState = {endColumn: selectedColumn};
        const action = setEndColumn(selectedColumn);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Dates", () => {
    it("sets the start date", () => {
        const state = {};
        const date = new Date('Jan 1, 2000');
        const action = setStartDate(date);
        const expectedState = {startDate: date};
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it("sets the end date", () => {
        const state = {};
        const date = new Date('Jan 1, 2000');
        const action = setEndDate(date);
        const expectedState = {endDate: date};
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Setting actions", () => {
    it("sets the list of actions", () => {
        const state = {};
        const actions = [{name: "an action"}];
        const expectedState = {actions};
        const action = setActions(actions);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});