import React from 'react';
import PropTypes from 'prop-types';
import StatsRow from './StatsRow';

const Stats = (props) => {
    return (
        <div className='stats'>
            <table>
                <tbody>
                    <th>
                        <td>
                            <span>Percentiles (based on {props.n} stories)</span>
                        </td>
                    </th> 
                    <StatsRow percentile={'50%'} value={props.fifty} />
                    <StatsRow percentile={'75%'} value={props.seventyFive} />
                    <StatsRow percentile={'85%'} value={props.eightyFive} />
                    <StatsRow percentile={'95%'} value={props.ninetyFive} />
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