import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { trelloAuth } from './AuthPortal/reducer';
import AuthPortalContainer from './AuthPortal/AuthPortalContainer';

const app = combineReducers({
    trelloAuth
});

const store = createStore(app);

const App = () => {
    return (
        <AuthPortalContainer />
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);