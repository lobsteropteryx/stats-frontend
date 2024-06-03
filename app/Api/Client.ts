import { Board, Card, Label, Column } from '@lobsteropteryx/stats-models';

export class Client {
    #baseUrl:string;

    constructor(baseUrl = `${window.location.origin}/api/`) {
        this.#baseUrl = baseUrl;
    }

    async #getData(url: string): Promise<any[]> {
        const response = await fetch(`${url}`, {})
        return await response.json();
    }

    async getBoards(): Promise<Board[]> {
        return this.#getData(`${this.#baseUrl}/boards`);
    }

    async getColumnsForBoard(boardId: string): Promise<Column[]> {
        return this.#getData(`${this.#baseUrl}/boards/${boardId}/columns`)
    }

    async getLabelsForBoard(boardId: string): Promise<Label[]> {
        return this.#getData(`${this.#baseUrl}/boards/${boardId}/labels`)
    }

    async getCardsForBoard(boardId: string): Promise<Card[]> {
        return this.#getData(`${this.#baseUrl}/boards/${boardId}/cards`)
    }
}