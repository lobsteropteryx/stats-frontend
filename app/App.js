import '../style.css';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import queryFilterSlice from './Filter/Query/queryFilterSlice';
import localFilterSlice from './Filter/Local/localFilterSlice';
import Filters from './Filter/Query/Filters';
import StartColumnsListContainer from './Filter/Local/StartColumnsListContainer';
import EndColumnsListContainer from './Filter/Local/EndColumnsListContainer'
import AuthPortalContainer from './Trello/AuthPortal/AuthPortalContainer';
import ScatterPlotContainer from './ScatterPlot/ScatterPlotContainer';
import HistogramContainer from './Histogram/HistogramContainer';
import StatsContainer from './Stats/StatsContainer';
import settingsSlice from './Settings/settingsSlice';
import SettingsContainer from './Settings/SettingsContainer';
import StartDateContainer from './Filter/Local/Date/StartDateContainer';
import EndDateContainer from './Filter/Local/Date/EndDateContainer';
import dateSlice from './Filter/Local/Date/dateSlice';
import LabelSelectContainer from './Filter/Local/Label/LabelSelectContainer';

const store = configureStore({
    reducer: {
        queryFilter: queryFilterSlice,
        localFilter: localFilterSlice,
        settings: settingsSlice,
        date: dateSlice
    }
});

window.store = store;

const App = () => {
    return (
        <div className="container">
            <AuthPortalContainer />
            <div className="wrapper">
                <div className="filter">
                    <fieldset>
                        <legend>Query Filters</legend>
                        <Filters />
                    </fieldset>
                    <fieldset>
                        <legend>Local Filters</legend>
                        <div className="settings">
                            <StartColumnsListContainer />
                            <EndColumnsListContainer />
                            <StartDateContainer />
                            <EndDateContainer />
                            <LabelSelectContainer />
                            <SettingsContainer />
                        </div>
                    </fieldset>
                    <StatsContainer />
                </div>
                <div className="chart">
                    <HistogramContainer />
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