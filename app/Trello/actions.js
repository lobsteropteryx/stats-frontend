export const GET_BOARDS = "GET_BOARDS";
export const SELECT_BOARD = "SELECT_BOARD";

export function getBoards(boards) {
    return { type: GET_BOARDS, boards}
}

export function selectBoard(board) {
    return { type: SELECT_BOARD, board}
}