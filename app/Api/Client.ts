import axios, { AxiosInstance } from 'axios';
import { Board, Card, Label, Column } from '@lobsteropteryx/stats-models';

export class Client {
    #axiosInstance:AxiosInstance;
    
    constructor(baseUrl = `${window.location.host}/api/`) {
        this.#axiosInstance = axios.create({
            baseURL: baseUrl
        });
    }

    getBoards():Promise<Board[]> {
        return this.#axiosInstance
            .get(`/boards`, {})
            .then(response => response.data);
    }
    
    getColumnsForBoard(boardId:string):Promise<Column[]> {
        return this.#axiosInstance
            .get(`/boards/${boardId}/columns`, {})
            .then(response => response.data);
    }

    getLabelsForBoard(boardId:string):Promise<Label[]> {
        return this.#axiosInstance
            .get(`/boards/${boardId}/labels`, {})
            .then(response => response.data);
    }
    
    getCardsForBoard(boardId:string):Promise<Card[]> {
        return this.#axiosInstance
            .get(`/boards/${boardId}/cards`, {})
            .then(response => response.data);
    }
}