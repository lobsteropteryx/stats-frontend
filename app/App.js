import '../style.css';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { trello } from './Trello/reducer';
import Filters from './Trello/Filters';

const rootReducer = combineReducers({
    trello
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.store = store;

const App = () => {
    return (
        <div>
            <Filters />
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);