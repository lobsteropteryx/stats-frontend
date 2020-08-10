import React from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

const ScatterPlot = (props) => (
    <ResponsiveScatterPlot
        data={props.data}
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
            format: '%b %d',
            tickValues: 'every 2 days',
            orient: 'bottom',
            legend: 'Date Completed',
            legendPosition: 'middle',
            legendOffset: 60
        }}
        axisLeft={{
            orient: 'left',
            legend: 'Days to Complete',
            legendPosition: 'middle',
            legendOffset: -60
        }}
        tooltip={({ node }) => (
            <div style={{
                color: node.style.color,
                background: '#D3D3D3',
                padding: '12px 16px',
            }}>
                <strong>
                    {node.data.name}
                </strong>
                <br />
                {`Completed on: ${node.data.formattedX}`}
                <br />
                {`Duration: ${node.data.formattedY}`}
            </div>
        )}
    />
)

export default ScatterPlot;