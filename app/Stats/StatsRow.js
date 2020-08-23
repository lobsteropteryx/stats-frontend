import React from 'react';
import PropTypes from 'prop-types';

const StatsRow = (props) => {
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