import configureMockStore from 'redux-mock-store';
import reducer, { 
    fetchBoards, 
    fetchCardsForBoard, 
    fetchDataForBoard,
    changeSelectedBoard
} from '../../../app/Filter/Query/queryFilterSlice';
import {
    setTrelloToken,
    fetchPending,
    fetchComplete,
    enableExport,
    disableExport,
    setBoards,
    selectBoard,
    setCsvData
} from '../../../app/Filter/Query/queryFilterSlice';
import { setCards, setColumns, setStartColumn, setEndColumn, setLabels, selectLabels } from '../../../app/Filter/Local/localFilterSlice';
import { Column } from '@lobsteropteryx/stats-models';

const mockStore = configureMockStore([]);

describe("Initial state", () => {
    it("sets the proper initial state", () => {
        const state = undefined;
        const expectedState = {
            apiKey: "683c53951940857c57dc075ab2b57ad8",
            token: "",
            isFetching: false,
            boards: [],
            selectedBoard: {id: "", name: ""},
            exportEnabled: false,
            csvData: {}
        };
        const action = { type:"unknown", payload: null, action: "default" };
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Authentication", () => {
    it("sets the trello token", () => {
        const state = {
            apiKey: "683c53951940857c57dc075ab2b57ad8",
            token: "",
            isFetching: false,
            boards: [],
            selectedBoard: {id: "", name: ""},
            exportEnabled: false,
            csvData: {}
        };
        const token = 'abc';
        const expectedState = {...state, token};
        const action = setTrelloToken(token);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Exporting data", () => {
    it("enables exporting data after fetch", () => {
        const state = {
            apiKey: "683c53951940857c57dc075ab2b57ad8",
            token: "",
            isFetching: false,
            boards: [],
            selectedBoard: {id: "", name: ""},
            exportEnabled: false,
            csvData: {}
        };
        const exportEnabled = true;
        const expectedState = {...state, exportEnabled};
        const action = enableExport();
        expect(reducer(state, action)).toEqual(expectedState);
    });
    
    it("disables exporting data when changing boards", () => {
        const state = {
            apiKey: "683c53951940857c57dc075ab2b57ad8",
            token: "",
            isFetching: false,
            boards: [],
            selectedBoard: {id: "", name: ""},
            exportEnabled: true,
            csvData: {}
        };
        const exportEnabled = false
        const expectedState = {...state, exportEnabled};
        const action = disableExport();
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Showing fetch state", () => {
    it("shows fetch is pending", () => {
        const state = {
            apiKey: "683c53951940857c57dc075ab2b57ad8",
            token: "",
            isFetching: false,
            boards: [],
            selectedBoard: {id: "", name: ""},
            exportEnabled: false,
            csvData: {}
        };
        const isFetching = true;
        const expectedState = {...state, isFetching};
        const action = fetchPending();
        expect(reducer(state, action)).toEqual(expectedState);
    });
    
    it("shows fetch is complete", () => {
        const state = {
            apiKey: "683c53951940857c57dc075ab2b57ad8",
            token: "",
            isFetching: true,
            boards: [],
            selectedBoard: {id: "", name: ""},
            exportEnabled: false,
            csvData: {}
        };
        const isFetching = false;
        const expectedState = {...state, isFetching};
        const action = fetchComplete();
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Setting boards", () => {
    it("sets the list of boards", () => {
        const state = {
            apiKey: "683c53951940857c57dc075ab2b57ad8",
            token: "",
            isFetching: false,
            boards: [],
            selectedBoard: {id: "", name: ""},
            exportEnabled: false,
            csvData: {}
        };
        const boards = [{id: "boardId", name: "a board"}];
        const expectedState = {...state, boards};
        const action = setBoards(boards);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Selecting a board", () => {
    it("Sets the board", () => {
        const state = {
            apiKey: "683c53951940857c57dc075ab2b57ad8",
            token: "",
            isFetching: false,
            boards: [],
            selectedBoard: {id: "", name: ""},
            exportEnabled: false,
            csvData: {}
        };
        const selectedBoard = {id: '1', name: 'selectedBoard'};
        const expectedState = {...state, selectedBoard};
        const action = selectBoard(selectedBoard);
        expect(reducer(state, action)).toEqual(expectedState);
    });
});

describe("Updating the selected board", () => {
    const state = {};
    const board = {id: '1', name: 'myBoard'}

    const expectedActions = [
        selectBoard(board),
        setStartColumn({ id: null, name: null }),
        setEndColumn({ id: null, name: null }),
        setLabels([]),
        selectLabels([]),
        disableExport()
    ];

    const store = mockStore(state);

    const actionCreator = changeSelectedBoard(board);
    actionCreator(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
})

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

    it("fetches data for board", async () => {
        const state = {
            apiKey: "683c53951940857c57dc075ab2b57ad8",
            token: "",
            isFetching: false,
            boards: [],
            selectedBoard: {id: "", name: ""},
            exportEnabled: false,
            csvData: {}
        };
        const columns = [];
        const labels = [];
        const boardId = "boardId";

        const expectedActions = [
            fetchPending(),
            setColumns(columns),
            setStartColumn(undefined),
            setEndColumn(undefined),
            setLabels(labels),
            fetchComplete()
        ];
            
        const apiClient = {
            getListsForBoard: () => {
                return columns;
            },
            getLabelsForBoard: () => {
                return labels;
            }
        };

        const store = mockStore(state);

        const actionCreator = fetchDataForBoard(apiClient, boardId);
        await actionCreator(store.dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fetches cards", async () => {
        global.URL.createObjectURL = jest.fn(() => "myUrl");
        jest.spyOn(global.Date, 'now')
        .mockImplementationOnce(() =>
          new Date('2019-05-14T00:00:00.000Z').valueOf()
        );

        const state = {
            columns: [
                {id: "1", name: "ToDo"},
                {id: "2", name: "Doing"},
                {id: "3", name: "Done"}
            ]
        };
        const board = {
            id: 1,
            name: "myBoard"
        };

        const cards = [];
        const csvData = {
            content: "",
            filename: "myBoard-2019-05-14.csv",
            url: "myUrl"
        };

        const expectedActions = [
            fetchPending(),
            setCards(cards),
            setCsvData(csvData),
            fetchComplete(),
            enableExport()
        ];
            
        const apiClient = {
            getCardsForBoard: (boardId) => {
                return cards;
            }
        };

        const store = mockStore(state);

        const actionCreator = fetchCardsForBoard(apiClient, board);
        await actionCreator(store.dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    });
});