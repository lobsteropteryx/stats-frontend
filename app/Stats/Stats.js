import React from 'react';
import PropTypes from 'prop-types';

const Stats = (props) => {
    return (
        <div>
            <span>Percentiles (based on {props.n} cards)</span>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <span>50% of stories were completed within {props.fifty} days</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>75% of stories were completed within {props.seventyFive} days</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>85% of stories were completed within {props.eightyFive} days</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>95% of stories were completed within {props.ninetyFive} days</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

Stats.propTypes = {
    n: PropTypes.number.isRequired,
    fifty: PropTypes.number.isRequired,
    seventyFive: PropTypes.number.isRequired,
    eightyFive: PropTypes.number.isRequired,
    ninetyFive: PropTypes.number.isRequired
};

export default Stats;