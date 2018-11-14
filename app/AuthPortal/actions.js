export const SET_TRELLO_TOKEN = "SET_TRELLO_TOKEN";

export function setTrelloToken(token) {
    return { type: SET_TRELLO_TOKEN, token}
}