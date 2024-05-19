import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

interface StatsRowProps {
    percentile:string,
    value:number
}

const StatsRow:FunctionComponent<StatsRowProps> = (props:StatsRowProps) => {
    return (
        <tr>
           <th scope='row'>{props.percentile}</th>
           <td>{props.value}</td>
        </tr>
    );
};

StatsRow.propTypes = {
    percentile: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

export default StatsRow;