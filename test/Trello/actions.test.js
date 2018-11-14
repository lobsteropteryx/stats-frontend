import { getBoards, GET_BOARDS } from '../../app/Trello/actions';

describe("Actions", () => {
    it("gets a list of trello boards", () => {
        const boards = [];
        expect(getBoards(boards)).toEqual({
            type: GET_BOARDS, boards: boards
        });
    });
});