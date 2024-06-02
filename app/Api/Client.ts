import { getAuthToken } from './Auth';
import { Board, Card, Label, Column } from '@lobsteropteryx/stats-models';

export class Client {
    #baseUrl:string;

    constructor(baseUrl = `${window.location.origin}/api/`) {
        this.#baseUrl = baseUrl;
    }

    async getBoards(): Promise<Board[]> {
        const token = await getAuthToken();
        const response = await fetch(`${this.#baseUrl}/boards`, {
            headers: { Authorization: token }
        })
        return await response.json();
    }

    async getColumnsForBoard(boardId: string): Promise<Column[]> {
        const token = await getAuthToken();
        const response = await fetch(`${this.#baseUrl}/boards/${boardId}/columns`, {
            headers: { Authorization: token }
        })
        return await response.json();
    }

    async getLabelsForBoard(boardId: string): Promise<Label[]> {
        const token = await getAuthToken();
        const response = await fetch(`${this.#baseUrl}/boards/${boardId}/labels`, {
            headers: { Authorization: token }
        })
        return await response.json();
    }

    async getCardsForBoard(boardId: string): Promise<Card[]> {
        const token = await getAuthToken();
        const response = await fetch(`${this.#baseUrl}/boards/${boardId}/cards`, {
            headers: { Authorization: token }
        })
        return await response.json();
    }
}