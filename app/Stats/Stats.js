import React from 'react';
import PropTypes from 'prop-types';

const Stats = (props) => {
    return (
        <div>
            <span className="stats">Average duration: {props.average} ± {2 * props.stdev} days, based on {props.n} cards</span>
        </div>
    );
};

Stats.propTypes = {
    average: PropTypes.number.isRequired,
    stdev: PropTypes.number.isRequired,
    n: PropTypes.number.isRequired
};

export default Stats;