import React from 'react';
import PropTypes from 'prop-types';

const StatsRow = (props) => {
    return (
        <tr>
            <td>
                <span>{props.percentile} of stories complete within {props.value} days</span>
            </td>
        </tr>
    );
}

StatsRow.propTypes = {
    percentile: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default StatsRow;