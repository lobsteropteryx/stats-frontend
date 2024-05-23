import '../style.css';
import 'babel-polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Filters from './Filter/Query/Filters';
import StartColumnsListContainer from './Filter/Local/StartColumnsListContainer';
import EndColumnsListContainer from './Filter/Local/EndColumnsListContainer'
import ScatterPlotContainer from './ScatterPlot/ScatterPlotContainer';
import HistogramContainer from './Histogram/HistogramContainer';
import StatsContainer from './Stats/StatsContainer';
import SettingsContainer from './Settings/SettingsContainer';
import StartDateContainer from './Filter/Local/Date/StartDateContainer';
import EndDateContainer from './Filter/Local/Date/EndDateContainer';
import LabelSelectContainer from './Filter/Local/Label/LabelSelectContainer';
import { store } from './store';


const App = () => {
    return (
        <div className="container">
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

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);