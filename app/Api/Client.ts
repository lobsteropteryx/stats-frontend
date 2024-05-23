import axios, { AxiosInstance } from 'axios';
import { Board, Card, Label, Column } from '@lobsteropteryx/stats-models';

const API_LIMIT = 250;

export class Client {
    key:string;
    token:string;
    axiosInstance:AxiosInstance;
    
    constructor(key, token, baseUrl) {
        this.key = key;
        this.token = token;
        this.axiosInstance = axios.create({
            baseURL: baseUrl
        });
    }

    getBoards():Promise<Board[]> {
        return this.axiosInstance
            .get(`/boards`, {
                params: {
                    key: this.key,
                    token: this.token
                }
            })
            .then(response => response.data);
    }
    
    getColumnsForBoard(boardId:string):Promise<Column[]> {
        return this.axiosInstance
            .get(`/boards/${boardId}/columns`, { 
                params: {
                    key: this.key,
                    token: this.token
                } 
            })
            .then(response => response.data);
    }

    getLabelsForBoard(boardId:string):Promise<Label[]> {
        return this.axiosInstance
            .get(`/boards/${boardId}/labels`, { 
                params: {
                    key: this.key,
                    token: this.token
                } 
            })
            .then(response => response.data);
    }
    
    getCardsForBoard(boardId:string):Promise<Card[]> {
        return this.axiosInstance
            .get(`/boards/${boardId}/cards`, { 
                params: {
                    key: this.key,
                    token: this.token
                } 
            })
            .then(response => response.data);
    }
}