import axios from 'axios';
import { last } from 'lodash';

const API_LIMIT = 250;

export class ApiClient {
    constructor(key, token, limit=API_LIMIT) {
        this.key = key;
        this.token = token;
        this.apiLimit = limit;
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
    
    getListsForBoard(boardId) {
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

    getLabelsForBoard(boardId) {
        return this.axiosInstance
            .get(`/boards/${boardId}/labels`, { 
                params: {
                    key: this.key,
                    token: this.token
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
                limit: this.apiLimit,
                actions: 'updateCard:idList,createCard,moveCardToBoard,copyCard',
                fields: 'labels,name',
                filter: 'all',
                sort: '-id'
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
                limit: this.apiLimit,
                actions: 'updateCard:idList,createCard,moveCardToBoard,copyCard',
                fields: 'labels,name',
                filter: 'all',
                sort: '-id',
                before: beforeDate
            } 
        })
        .then(response => response.data);
    }
}