import axios, { AxiosInstance } from 'axios';
import getAuthToken from './Auth';
import { Board, Card, Label, Column } from '@lobsteropteryx/stats-models';

export class Client {
    #axiosInstance: AxiosInstance;

    constructor(baseUrl = `${window.location.origin}/api/`) {
        this.#axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Authorization"
            }
        });
    }

    async getBoards(): Promise<Board[]> {
        const token = await getAuthToken();
        return this.#axiosInstance
            .get('/boards', {
                headers: { Authorization: token }
            })
            .then(response => response.data);
    }

    async getColumnsForBoard(boardId: string): Promise<Column[]> {
        const token = await getAuthToken();
        return this.#axiosInstance
            .get(`/boards/${boardId}/columns`, {
                headers: { Authorization: token }
            })
            .then(response => response.data);
    }

    async getLabelsForBoard(boardId: string): Promise<Label[]> {
        const token = await getAuthToken();
        return this.#axiosInstance
            .get(`/boards/${boardId}/labels`, {
                headers: { Authorization: token }
            })
            .then(response => response.data);
    }

    async getCardsForBoard(boardId: string): Promise<Card[]> {
        const token = await getAuthToken();
        return this.#axiosInstance
            .get(`/boards/${boardId}/cards`, {
                headers: { Authorization: token }
            })
            .then(response => response.data);
    }
}