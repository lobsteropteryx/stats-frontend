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
            .reply(200, expected);

        const client = new ApiClient('key', 'token');

        return expect(client.getBoards()).resolves.toEqual(expected);
    });
    
    it('Can request columns', () => {
        const expected = {
            id: 'columnId',
            name: 'myColumn'
        };

        nock('https://api.trello.com')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get('/1/boards/1/lists')
            .query({filter: 'all'})
            .reply(200, expected);

        const client = new ApiClient('key', 'token');

        return expect(client.getColumnsForBoard(1)).resolves.toEqual(expected);
    });
})