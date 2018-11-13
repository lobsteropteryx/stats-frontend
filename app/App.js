import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {AuthPortal} from './AuthPortal';

const App = () => {
    return (
        <AuthPortal apiKey = {'e052546597a829919aae4fbd2a6e4095'} />
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);