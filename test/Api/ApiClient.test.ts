import nock from 'nock';

import { Client as ApiClient } from '../../app/Api/Client';
import { Board, Card, Column, Label } from '@lobsteropteryx/stats-models';

describe('Stats backend API requests', () => {
    const baseUrl = "https://api.stats.com";

    it('Can request boards', () => {
        const expected:Board[] = [{
            id: 'boardId',
            name: 'myBoard'
        }];

        const scope = nock(baseUrl)
            .get('/boards')
            .reply(200, expected);

        const client = new ApiClient(baseUrl);
        return expect(client.getBoards()).resolves.toEqual(expected);
    });

    it('Can request columns for a board', () => {
        const expected:Column[] = [{
            id: 'columnId',
            name: 'myColumn'
        }];

        nock(baseUrl,)
            .get('/boards/1/columns')
            .reply(200, expected);

        const client = new ApiClient(baseUrl);

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
            .reply(200, expected);

        const client = new ApiClient(baseUrl);

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
            .reply(200, expected);

        const client = new ApiClient(baseUrl);

        return expect(client.getCardsForBoard("1")).resolves.toEqual(expected);
    });
});