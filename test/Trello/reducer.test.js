import { trelloData } from '../../app/Trello/reducer';
import { getBoards, FETCH_BOARDS } from '../../app/Trello/actions';

describe("Getting boards", () => {
    it("sets the default state", () => {
        const state = {boards: []};
        const action = { type: 'test' };
        expect(trelloData(state, action)).toEqual(state);
    });

    it("sets the list of boards", () => {
        const state = {};
        const boards = [{name: "a board"}];
        const expectedState = {isFetching: false, boards};
        const action = getBoards(boards);
        expect(trelloData(state, action)).toEqual(expectedState);
    });

    it("requests boards", async () => {
        const state = {};
        const expectedState = {isFetching: true};
        const action = {
            type: FETCH_BOARDS
        };
        expect(trelloData(state, action)).toEqual(expectedState);
    });
});