import '../style.css';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import filterSlice from './Filter/filterSlice';
import Filters from './Filter/Filters';
import AuthPortalContainer from './Trello/AuthPortal/AuthPortalContainer';
import ScatterPlotContainer from './ScatterPlot/ScatterPlotContainer';
import StatsContainer from './Stats/StatsContainer';
import settingsSlice from './Settings/settingsSlice';
import SettingsContainer from './Settings/SettingsContainer';

const rootReducer = combineReducers({
    filter: filterSlice,
    settings: settingsSlice
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.store = store;

const App = () => {
    return (
        <div className="container">
            <AuthPortalContainer />
            <div className="wrapper">
                <div className="filter">
                    <SettingsContainer />
                    <Filters />
                    <StatsContainer />
                </div>
                <div className="chart">
                    <ScatterPlotContainer />
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);