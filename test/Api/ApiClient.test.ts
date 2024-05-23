import nock from 'nock';

<<<<<<< Updated upstream:test/Trello/ApiClient.test.ts
import { ApiClient } from '../../app/Trello/ApiClient';
=======
import { ApiClient } from '../../app/Api/ApiClient';
import { Board, Card, Column, Label } from '@lobsteropteryx/stats-models';
>>>>>>> Stashed changes:test/Api/ApiClient.test.ts

describe('Stats backend API requests', () => {
    const baseUrl = "https://api.stats.com/";

    it('Can request boards', () => {
        const expected:Board[] = [{
            id: 'boardId',
            name: 'myBoard'
        }];

        const scope = nock(baseUrl)
            .get('/boards')
            .query({params: {key: "key", token: "token"}})
            .reply(200, expected);

        const client = new ApiClient('key', 'token', baseUrl);

        console.log(scope.activeMocks);

        return expect(client.getBoards()).resolves.toEqual(expected);
    });
    
    it('Can request columns for a board', () => {
        const expected:Column[] = [{
            id: 'columnId',
            name: 'myColumn'
        }];

        nock(baseUrl,)
            .get('/boards/1/columns')
            .query({params: {key: "key", token: "token"}})
            .reply(200, expected);

        const client = new ApiClient('key', 'token', baseUrl);

        return expect(client.getColumnsForBoard("1")).resolves.toEqual(expected);
    });

    it('Can request labels for a board', () => {
        const expected:Label[] = [{
            id: 'labelId',
            name: 'labelName',
            color: 'red'
        }];

        nock(baseUrl)
            .get('/boards/1/labels')
            .query({params: {key: "key", token: "token"}})
            .reply(200, expected);

        const client = new ApiClient('key', 'token', baseUrl);

        return expect(client.getLabelsForBoard("1")).resolves.toEqual(expected);
    });
    
    it('Can request cards for a board', () => {
        const expected:Card[] = [{
            id: 'cardId',
            name: 'cardName',
            labels: [],
            actions: []
        }];

        nock(baseUrl)
            .get('/boards/1/cards')
            .query({params: {key: "key", token: "token"}})
            .reply(200, expected);

        const client = new ApiClient('key', 'token', baseUrl);

        return expect(client.getCardsForBoard("1")).resolves.toEqual(expected);
    });
});
