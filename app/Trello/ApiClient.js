import axios from 'axios';
import { last } from 'lodash';

export class ApiClient {
    constructor(key, token) {
        this.key = key;
        this.token = token;
        this.axiosInstance = axios.create({
            baseURL: 'https://api.trello.com/1'
        });
    }

    getBoards() {
        return this.axiosInstance
            .get(`/members/me/boards`, {
                params: {
                    key: this.key,
                    token: this.token
                }
            })
            .then(response => response.data);
    }
    
    getColumnsForBoard(boardId) {
        return this.axiosInstance
            .get(`/boards/${boardId}/lists`, { 
                params: {
                    key: this.key,
                    token: this.token,
                    filter: 'all'
                } 
            })
            .then(response => response.data);
    }
    
    async getCardsForBoard(boardId) {
        let pageOfCards = await this._getFirstCardsPage(boardId);
        let allCards = pageOfCards;

        do {
            let lastCardId = last(allCards).id;
            pageOfCards = await this._getNextCardsPage(boardId, lastCardId);
            allCards = allCards.concat(pageOfCards);
        } while (pageOfCards.length !== 0)
        
        return allCards;
    }

    _getFirstCardsPage(boardId) {
        return this.axiosInstance
        .get(`/boards/${boardId}/cards`, { 
            params: {
                key: this.key,
                token: this.token,
                actions: 'updateCard:idList',
                fields: 'labels,name',
                filter: 'all'
            } 
        })
        .then(response => response.data);
    }

    _getNextCardsPage(boardId, beforeDate) {
        return this.axiosInstance
        .get(`/boards/${boardId}/cards`, { 
            params: {
                key: this.key,
                token: this.token,
                actions: 'updateCard:idList',
                fields: 'labels,name',
                filter: 'all',
                before: beforeDate
            } 
        })
        .then(response => response.data);
    }
}