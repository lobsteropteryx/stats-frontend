import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { trello } from './Trello/reducer';
import AuthPortalContainer from './Trello/AuthPortal/AuthPortalContainer';
import BoardsListContainer from './Trello/BoardsListContainer';

const rootReducer = combineReducers({
    trello
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const App = () => {
    return (
        <div>
            <AuthPortalContainer />
            <BoardsListContainer />
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);