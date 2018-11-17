import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { trello } from './Trello/reducer';
import AuthPortalContainer from './Trello/AuthPortal/AuthPortalContainer';
import Boards from './Trello/List/Boards';
import StartColumnList from './Trello/List/StartColumnList';
import EndColumnList from './Trello/List/EndColumnList';
import StartDate from './Trello/Date/StartDate';
import EndDate from './Trello/Date/EndDate';

const rootReducer = combineReducers({
    trello
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.store = store;

const App = () => {
    return (
        <div>
            <AuthPortalContainer />
            <StartDate />
            <EndDate />
            <Boards />
            <StartColumnList />
            <EndColumnList />
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);