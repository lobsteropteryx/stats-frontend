import nock from 'nock';

import ApiClient from '../../app/Trello/ApiClient';

describe('Trello API requests', () => {

    it('Can request boards', () => {
        const expected = {
            id: 'boardId',
            name: 'myBoard'
        };
        
        nock('https://api.trello.com')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get('/1/members/me/boards')
            .query({
                key: 'key', 
                token: 'token'
            })
            .reply(200, expected);

        const client = new ApiClient('key', 'token');

        return expect(client.getBoards()).resolves.toEqual(expected);
    });
    
    it('Can request columns for a board', () => {
        const expected = {
            id: 'columnId',
            name: 'myColumn'
        };

        nock('https://api.trello.com')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get('/1/boards/1/lists')
            .query({
                key: 'key', 
                token: 'token', 
                filter: 'all'
            })
            .reply(200, expected);

        const client = new ApiClient('key', 'token');

        return expect(client.getColumnsForBoard(1)).resolves.toEqual(expected);
    });

    describe('Requesting actions', () => {
        it('Can request one page of actions', () => {
            const expected = [{
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"0",
                        "name":"ToDo"
                    },
                    "listAfter": {
                        "id":"1",
                        "name":"Doing"
                    }
                },
                "date":"2020-04-02T16:00:00.000Z",
            }];

            nock('https://api.trello.com')
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                })
                .get('/1/boards/1/actions')
                .query({
                    key: 'key', 
                    token: 'token', 
                    fields: 'data,date',
                    filter: 'updateCard:idList'
                })
                .reply(200, expected);

            const client = new ApiClient('key', 'token');

            return expect(client.getActionsForBoard(1)).resolves.toEqual(expected);
        });
    });
});