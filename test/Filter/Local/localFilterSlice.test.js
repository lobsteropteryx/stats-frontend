import reducer from '../../../app/Filter/Local/localFilterSlice';
import {
    setCards,
    setColumns,
    setStartColumn,
    setEndColumn,
    setLabels
} from '../../../app/Filter/Local/localFilterSlice';

describe("Initial state", () => {
    it("sets the proper initial state", () => {
        const state; // undefined
        const expectedState = {
            cards: [],
            columns: [],
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null },
            labels: []
        };
        const action = { payload: null, action: "default" };
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

describe("Setting labels", () => {
    it("sets the list of labels", () => {
        const state = {};
        const labels = [{
            id: "1",
            name: "a label"
        }];
        const expectedState = {labels};
        const action = setLabels(labels);
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

describe("Selecting columns", () => {
    it("Sets the selected start column", () => {
        const state = {};
        const selectedColumn = {id: 1, name: 'selectedColumn'};
        const expectedState = {startColumn: {id: 1, name: 'selectedColumn'}};
        const action = setStartColumn(selectedColumn);
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it("Sets the selected end column", () => {
        const state = {};
        const selectedColumn = {id: 1, name: 'selectedColumn'};
        const expectedState = {endColumn: {id: 1, name: 'selectedColumn'}};
        const action = setEndColumn(selectedColumn);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});
