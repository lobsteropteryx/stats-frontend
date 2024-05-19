import { UnknownAction } from 'redux';
import reducer from '../../../app/Filter/Local/localFilterSlice';
import {
    setCards,
    setColumns,
    setStartColumn,
    setEndColumn,
    setLabels,
    selectLabels
} from '../../../app/Filter/Local/localFilterSlice';

describe("Initial state", () => {
    it("sets the proper initial state", () => {
        const state = undefined;
        const expectedState = {
            cards: [],
            columns: [],
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null },
            labels: [],
            selectedLabels: []
        };
        const action:UnknownAction = { type:"unknown", payload: null, action: "default" };
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Setting columns", () => {
    it("sets the list of columns", () => {
        const state = {
            cards: [],
            columns: [],
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null },
            labels: [],
            selectedLabels: []
        };;
        const columns = [{id: "columnId", name: "a list"}];
        const expectedState = {...state, columns};
        const action = setColumns(columns);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Setting labels", () => {
    it("sets the list of labels", () => {
        const state = {
            cards: [],
            columns: [],
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null },
            labels: [],
            selectedLabels: []
        };
        const labels = [{
            id: "1",
            name: "a label",
            color: "red"
        }];
        const expectedState = {...state, labels};
        const action = setLabels(labels);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Selecting labels", () => {
    it("sets the list of selected labels", () => {
        const state = {
            cards: [],
            columns: [],
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null },
            labels: [],
            selectedLabels: []
        }; 
        const selectedLabels = [{
            id: "1",
            name: "a label",
            color: "red"
        }];
        const expectedState = {...state, selectedLabels};
        const action = selectLabels(selectedLabels);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Setting cards", () => {
    it("sets the list of cards", () => {
        const state = {
            cards: [],
            columns: [],
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null },
            labels: [],
            selectedLabels: []
        }; 
        const cards = [{id: "cardId", name: "an action", labels:[], actions: []}];
        const expectedState = {...state, cards};
        const action = setCards(cards);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Selecting columns", () => {
    it("Sets the selected start column", () => {
        const state = {
            cards: [],
            columns: [],
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null },
            labels: [],
            selectedLabels: []
        };
        const startColumn = {id: '1', name: 'selectedColumn'};
        const expectedState = {...state, startColumn};
        const action = setStartColumn(startColumn);
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it("Sets the selected end column", () => {
        const state = {
            cards: [],
            columns: [],
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null },
            labels: [],
            selectedLabels: []
        }; 
        const endColumn = {id: '1', name: 'selectedColumn'};
        const expectedState = {...state, endColumn};
        const action = setEndColumn(endColumn);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});
