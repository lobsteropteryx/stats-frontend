import nock from 'nock';

import { ApiClient } from '../../app/Trello/ApiClient';

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

        return expect(client.getListsForBoard(1)).resolves.toEqual(expected);
    });

    it('Can request labels for a board', () => {
        const expected = {
            id: 'columnId',
            name: 'myColumn'
        };

        nock('https://api.trello.com')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get('/1/boards/1/labels')
            .query({
                key: 'key', 
                token: 'token'
            })
            .reply(200, expected);

        const client = new ApiClient('key', 'token');

        return expect(client.getLabelsForBoard(1)).resolves.toEqual(expected);
    });

    describe('Requesting cards', () => {
        it('Can request one page of cards with their actions', () => {

            const apiLimit = 1;
            
            const firstPage = [{
                id: 1,
                name: "myCard",
                actions: [{
                    id: 1,
                    labels: [],
                    data: {
                        card: {
                            id: 1,
                            name: 'myCard',
                            shortLink: 'link'
                        },
                        board: {
                            id: 1,
                            name: 'myBoard',
                            shortLink: 'board'
                        },
                        listBefore: {
                            id: 1,
                            name: 'ToDo'
                        },
                        listAfter: {
                            id: 1,
                            name: 'Doing'
                        }
                    },
                    date: '2020-04-02T16:00:00.000Z' 
                }]
            }];

            const secondPage = [];
            const expected = firstPage;

            nock('https://api.trello.com')
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                })
                .get('/1/boards/1/cards')
                .query({
                    key: 'key', 
                    token: 'token',
                    actions: 'updateCard:idList',
                    fields: 'labels,name',
                    filter: 'all',
                    limit: apiLimit,
                    sort: '-id'
                })
                .reply(200, firstPage);

            nock('https://api.trello.com')
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                })
                .get('/1/boards/1/cards')
                .query({
                    key: 'key', 
                    token: 'token',
                    actions: 'updateCard:idList',
                    fields: 'labels,name',
                    filter: 'all',
                    before: 1,
                    limit: apiLimit,
                    sort: '-id'
                })
                .reply(200, secondPage);

            const client = new ApiClient('key', 'token', apiLimit);
            
            return expect(client.getCardsForBoard(1)).resolves.toEqual(expected);
        });
        
        it('Can request all pages of cards with their actions', () => {

            const apiLimit = 1; 

            const firstPage = [{
                id: 1,
                name: "myCard",
                actions: [{
                    id: 1,
                    labels: [],
                    data: {
                        card: {
                            id: 1,
                            name: 'myCard',
                            shortLink: 'link'
                        },
                        board: {
                            id: 1,
                            name: 'myBoard',
                            shortLink: 'board'
                        },
                        listBefore: {
                            id: 1,
                            name: 'ToDo'
                        },
                        listAfter: {
                            id: 1,
                            name: 'Doing'
                        }
                    },
                    date: '2020-04-02T16:00:00.000Z' 
                }]
            }];

            const secondPage = [{
                id: 2,
                name: "myOtherCard",
                actions: [{
                    id: 2,
                    labels: [],
                    data: {
                        card: {
                            id: 2,
                            name: 'myOtherCard',
                            shortLink: 'link2'
                        },
                        board: {
                            id: 1,
                            name: 'myBoard',
                            shortLink: 'board'
                        },
                        listBefore: {
                            id: 1,
                            name: 'ToDo'
                        },
                        listAfter: {
                            id: 1,
                            name: 'Doing'
                        }
                    },
                    date: '2020-04-03T16:00:00.000Z' 
                }]
            }];
            const thirdPage = [];
            const expected = firstPage.concat(secondPage);
            
            nock('https://api.trello.com')
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                })
                .get('/1/boards/1/cards')
                .query({
                    key: 'key', 
                    token: 'token',
                    actions: 'updateCard:idList',
                    filter: 'all',
                    fields: 'labels,name',
                    limit: 1,
                    sort: '-id'
                })
                .reply(200, firstPage);

            nock('https://api.trello.com')
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                })
                .get('/1/boards/1/cards')
                .query({
                    key: 'key', 
                    token: 'token',
                    actions: 'updateCard:idList',
                    fields: 'labels,name',
                    filter: 'all',
                    before: 1,
                    limit: 1,
                    sort: '-id'
                })
                .reply(200, secondPage);
            
            nock('https://api.trello.com')
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                })
                .get('/1/boards/1/cards')
                .query({
                    key: 'key', 
                    token: 'token',
                    actions: 'updateCard:idList',
                    fields: 'labels,name',
                    filter: 'all',
                    before: 2,
                    limit: 1,
                    sort: '-id'
                })
                .reply(200, thirdPage);

            const client = new ApiClient('key', 'token', apiLimit);
            
            return expect(client.getCardsForBoard(1)).resolves.toEqual(expected);
        });
    });
});