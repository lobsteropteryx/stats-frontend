import axios from 'axios';
import { last } from 'lodash';

export default class ApiClient {
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
    
    async getActionsForBoard(boardId) {
        let pageOfActions = await this._getFirstActionsPage(boardId);
        let allActions = pageOfActions;

        do {
            let lastActionId = last(allActions).id;
            pageOfActions = await this._getNextActionsPage(boardId, lastActionId);
            allActions = allActions.concat(pageOfActions);
        } while (pageOfActions.length !== 0)
        
        return allActions;
    }

    _getFirstActionsPage(boardId) {
        return this.axiosInstance
        .get(`/boards/${boardId}/actions`, { 
            params: {
                key: this.key,
                token: this.token,
                fields: 'data,date',
                filter: 'updateCard:idList'
            } 
        })
        .then(response => response.data);
    }

    _getNextActionsPage(boardId, beforeDate) {
        return this.axiosInstance
            .get(`/boards/${boardId}/actions`, { 
                params: {
                    key: this.key,
                    token: this.token,
                    fields: 'data,date',
                    filter: 'updateCard:idList',
                    before: beforeDate
                } 
            })
            .then(response => response.data);
    }
}