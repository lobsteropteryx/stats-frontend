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
            const firstPage = [{
                "id": "1",
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

            const secondPage = [];
            const expected = firstPage;

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
                .reply(200, firstPage);

            nock('https://api.trello.com')
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                })
                .get('/1/boards/1/actions')
                .query({
                    key: 'key', 
                    token: 'token', 
                    fields: 'data,date',
                    filter: 'updateCard:idList',
                    before: '1'
                })
                .reply(200, secondPage);

            const client = new ApiClient('key', 'token');

            return expect(client.getActionsForBoard(1)).resolves.toEqual(expected);
        });

        it('Can request all pages of actions', () => {

            const firstPage = [{
                "id": "1",
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

            const secondPage = [{
                "id": "2",
                "data": {
                    "card": {
                        "id":"1",
                        "name":"Card 1",
                    },
                    "listBefore": {
                        "id":"0",
                        "name":"Doing"
                    },
                    "listAfter": {
                        "id":"1",
                        "name":"Done"
                    }
                },
                "date":"2019-04-02T16:00:00.000Z",
            }];

            const thirdPage = [];

            const expected = firstPage.concat(secondPage);

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
                .reply(200, firstPage);

            nock('https://api.trello.com')
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                })
                .get('/1/boards/1/actions')
                .query({
                    key: 'key', 
                    token: 'token', 
                    fields: 'data,date',
                    filter: 'updateCard:idList',
                    before: '1'
                })
                .reply(200, secondPage);

            nock('https://api.trello.com')
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                })
                .get('/1/boards/1/actions')
                .query({
                    key: 'key', 
                    token: 'token', 
                    fields: 'data,date',
                    filter: 'updateCard:idList',
                    before: '2'
                })
                .reply(200, thirdPage);

                const client = new ApiClient('key', 'token');

            return expect(client.getActionsForBoard(1)).resolves.toEqual(expected);
        });
    });
});