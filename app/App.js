import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { trello } from './Trello/reducer';
import AuthPortalContainer from './Trello/AuthPortal/AuthPortalContainer';
import Boards from './Trello/List/Boards';
import StartColumns from './Trello/List/StartColumns';
import EndColumns from './Trello/List/EndColumns';
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
            <StartColumns />
            <EndColumns />
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);