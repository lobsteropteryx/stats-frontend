import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const Histogram = (props) => (
    <div className="chartContainer" style={{display: props.display}}>
        <ResponsiveBar
            data={props.data}
            indexBy='id'
            groupMode='grouped'
            colors={{ scheme: 'dark2' }}
            margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
            enableGridY={true}
            axisBottom={{
                legend: 'Days to Complete',
                legendPosition: 'middle',
                legendOffset: 60
            }}
            axisLeft={{
                legend: 'Completed Stories',
                legendPosition: 'middle',
                legendOffset: -60
            }}
        />
    </div>
)

export default Histogram;