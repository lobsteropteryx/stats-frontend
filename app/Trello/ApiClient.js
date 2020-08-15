import axios from 'axios';

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
}