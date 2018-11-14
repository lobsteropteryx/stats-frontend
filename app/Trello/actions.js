export const GET_BOARDS = "GET_BOARDS";

export function getBoards(boards) {
    return { type: GET_BOARDS, boards}
}