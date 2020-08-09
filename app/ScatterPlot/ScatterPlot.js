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
        yFormat={function(e){return e+" cm"}}
        blendMode="multiply"
        axisBottom={{
            format: '%b %d',
            tickValues: 'every 2 days',
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'size',
            legendPosition: 'middle',
            legendOffset: -60
        }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 130,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 12,
                itemsSpacing: 5,
                itemDirection: 'left-to-right',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default ScatterPlot;