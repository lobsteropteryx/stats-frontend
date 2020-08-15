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
            .get(`/members/me/boards`)
            .then(response => response.data);
    }
    
    getColumnsForBoard(boardId) {
        return this.axiosInstance
            .get(`/boards/${boardId}/lists`, { params: {filter: 'all'} })
            .then(response => response.data);
    }
}