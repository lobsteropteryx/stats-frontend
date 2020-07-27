export async function fetchBoards(trelloClient) {
    return trelloClient.makeRequest('get', '/1/members/me/boards', {filter: 'open'});
}

export async function fetchCardsForBoard(trelloClient, boardId) {
    return trelloClient.makeRequest('get', `/1/boards/${boardId}/cards`, {filter: 'open'});
}

export async function fetchActionsForBoard(trelloClient, boardId) {
    return trelloClient.makeRequest('get', `/1/boards/${boardId}/actions`, {
        fields: 'data,date',
        filter: 'updateCard:idList'
    });
}

export async function fetchColumnsForBoard(trelloClient, boardId) {
    return trelloClient.makeRequest('get', `/1/boards/${boardId}/lists`, {filter: 'all'});
}