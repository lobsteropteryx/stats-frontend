import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const Histogram = (props) => (
    <div className="chartContainer" style={{display: props.display}}>
        <ResponsiveBar
            data={props.data}
            indexBy='id'
            groupMode='grouped'
            colors={{ scheme: 'dark2' }}
            nodeSize={12}
            margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
            xScale={{
                type: 'time',
                format: '%Y-%m-%d',
                precision: 'day',
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            yFormat={function(e){return e+" days"}}
            enableGridY={true}
            axisBottom={{
                orient: 'bottom',
                legend: 'Days to Complete',
                legendPosition: 'middle',
                legendOffset: 60
            }}
            axisLeft={{
                orient: 'left',
                legend: 'Completed Stories',
                legendPosition: 'middle',
                legendOffset: -60
            }}
        />
    </div>
)

export default Histogram;