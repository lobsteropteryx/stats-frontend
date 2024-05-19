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
    
    it("disables exporting data when changing boards", () => {
        const state = {
            exportEnabled: true
        };
        const expectedState = {
            exportEnabled: false 
        };
        const action = disableExport;
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
    it("Sets the board", () => {
        const state = {};
        const selectedBoard = {id: 1, name: 'selectedBoard'};
        const expectedState = {
            selectedBoard: selectedBoard
        };
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
        const state = {};
        const columns = [];
        const labels = [];

        const expectedActions = [
            fetchPending(),
            setColumns(columns),
            setStartColumn(),
            setEndColumn(),
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

        const actionCreator = fetchDataForBoard(apiClient);
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