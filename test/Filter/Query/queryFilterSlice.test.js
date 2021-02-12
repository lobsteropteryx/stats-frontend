import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, { fetchBoards, fetchActionsForBoard, fetchColumnsForBoard } from '../../../app/Filter/Query/queryFilterSlice';
import {
    setTrelloToken,
    fetchPending,
    fetchComplete,
    enableExport,
    setBoards,
    selectBoard,
    setCsvData,
    exportCsvData
} from '../../../app/Filter/Query/queryFilterSlice';
import { setCards, setColumns, setStartColumn, setEndColumn } from '../../../app/Filter/Local/localFilterSlice';

const mockStore = configureMockStore([thunk]);

describe("Initial state", () => {
    it("sets the proper initial state", () => {
        const state; // undefined
        const expectedState = {
            apiKey: "e052546597a829919aae4fbd2a6e4095",
            boards: [],
            selectedBoard: {},
            exportEnabled: false
        };
        const action = { payload: null, action: "default" };
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Authentication", () => {
    it("sets the trello token", () => {
        const state = {};
        const token = 'abc';
        const action = setTrelloToken(token);
        expect(reducer(state, action)).toEqual({token});
    });
});

describe("Exporting data", () => {
    it("enables exporting data after fetch", () => {
        const state = {
            exportEnabled: false
        };
        const expectedState = {
            exportEnabled: true 
        };
        const action = enableExport;
        expect(reducer(state, action)).toEqual(expectedState);
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
        const state = {
            startColumn: 'start', 
            endColumn: 'ending',
            exportEnabled: true
        };
        const selectedBoard = {id: 1, name: 'selectedBoard'};
        const expectedState = {
            selectedBoard: selectedBoard,
            startColumn: { id: null, name: null },
            endColumn: { id: null, name: null },
            exportEnabled: false
        };
        const action = selectBoard(selectedBoard);
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

    it("fetches columns", async () => {
        const state = {};
        const columns = [];

        const expectedActions = [
            fetchPending(),
            setColumns(columns),
            setStartColumn(),
            setEndColumn(),
            fetchComplete()
        ];
            
        const apiClient = {
            getColumnsForBoard: () => {
                return columns;
            }
        };

        const store = mockStore(state);

        const actionCreator = fetchColumnsForBoard(apiClient);
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
            fetchComplete(),
            enableExport()
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

describe("Exporting to CSV", () => {

    it("sets CSV data", () => {
        const state = {};
        const csvData = "column,anotherColumn";
        const expectedState = {csvData};
        const action = setCsvData(csvData);
        expect(reducer(state, action)).toEqual(expectedState);
    })
    
    it("exports cards to CSV", async () => {

        global.URL.createObjectURL = jest.fn(() => "myUrl");
        const state = {};

        const cards = [];
        const boardName = "myBoard";
        const csvData = {
            content: "",
            filename: "myBoard-2021-02-12",
            url: "myUrl"
        };

        const expectedActions = [
            fetchPending(),
            setCsvData(csvData),
            fetchComplete()
        ];

        const store = mockStore(state);

        const actionCreator = exportCsvData(cards, boardName);
        await actionCreator(store.dispatch);
        expect(store.getActions()).toEqual(expectedActions);

        global.URL.createObjectURL.mockRestore();
    });
});