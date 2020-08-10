import React from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

const ScatterPlot = (props) => (
    <ResponsiveScatterPlot
        data={props.data}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat={function(e){return e+" days"}}
        axisBottom={{
            format: '%b %d',
            tickValues: 'every 2 days',
        }}
    />
)

export default ScatterPlot;