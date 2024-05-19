import React from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { ChartData } from 'stats-models';

const ScatterPlot = (props) => (
    <div className="chartContainer" style={{display: props.display}} >
        <ResponsiveScatterPlot
            data={props.data}
            onClick={props.onClick}
            colors={{ scheme: 'dark2' }}
            useMesh={false}
            nodeSize={12}
            margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
            xScale={{
                type: 'time',
                format: '%Y-%m-%d',
                precision: 'day',
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            yFormat={e => `${e} days`}
            enableGridY={true}
            axisBottom={{
                format: '%b %d',
                tickValues: 'every week',
                tickRotation: 90,
                legend: 'Date Completed',
                legendPosition: 'middle',
                legendOffset: 60
            }}
            axisLeft={{
                legend: 'Days to Complete',
                legendPosition: 'middle',
                legendOffset: -60
            }}
            tooltip={({ node }) => (
                <div style={{
                    background: '#D3D3D3',
                    padding: '12px 16px',
                }}>
                    <strong>
                        {(node.data as ChartData).name}
                    </strong>
                    <br />
                    {`Completed on: ${node.formattedX}`}
                    <br />
                    {`Duration: ${node.formattedY}`}
                </div>
            )}
        />
    </div>
)

export default ScatterPlot;