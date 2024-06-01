import nock from 'nock';
import { vi } from "vitest";
import { Client as ApiClient } from '../../app/Api/Client';
import { Board, Card, Column, Label } from '@lobsteropteryx/stats-models';

describe('Stats backend API requests', () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const baseUrl = "http://localhost/api";

    vi.mock('../../app/Api/Auth', () => {
        return {
            default: () => {
                { getAuthToken: vi.fn(() => "token") }
            }
        };
    });

    it('Can request boards', async () => {
        const expected: Board[] = [{
            id: 'boardId',
            name: 'myBoard'
        }];

        const scope = nock(baseUrl, {
            reqheaders: {
                'Authorization': 'token'
            } 
        })
            .get('/boards')
            .reply(200, expected);

        const client = new ApiClient(baseUrl);
        expect(await client.getBoards()).toEqual(expected);
    });

    it('Can request columns for a board', async () => {
        const expected: Column[] = [{
            id: 'columnId',
            name: 'myColumn'
        }];

        const scope = nock(baseUrl, {
            reqheaders: {
                'Authorization': 'token'
            }
        })
            .get('/boards/1/columns')
            .reply(200, expected);

        const client = new ApiClient(baseUrl);

        expect(await client.getColumnsForBoard("1")).toEqual(expected);
    });

    it('Can request labels for a board', async () => {
        const expected: Label[] = [{
            id: 'labelId',
            name: 'labelName',
            color: 'red'
        }];

        const scope = nock(baseUrl, {
            reqheaders: {
                'Authorization': 'token'
            }
        })
            .get('/boards/1/labels')
            .reply(200, expected);

        const client = new ApiClient(baseUrl);

        expect(await client.getLabelsForBoard("1")).toEqual(expected);
    });

    it('Can request cards for a board', async () => {
        const expected: Card[] = [{
            id: 'cardId',
            name: 'cardName',
            labels: [],
            actions: []
        }];

        const scope = nock(baseUrl, {
            reqheaders: {
                'Authorization': 'token'
            }
        })
            .get('/boards/1/cards')
            .reply(200, expected);

        const client = new ApiClient(baseUrl);

        expect(await client.getCardsForBoard("1")).toEqual(expected);
    });
});