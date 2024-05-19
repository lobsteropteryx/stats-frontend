import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import StatsRow from './StatsRow';

interface StatsProps {
    n:number,
    fifty:number,
    seventyFive:number,
    eightyFive:number,
    ninetyFive:number
};

const Stats:FunctionComponent<StatsProps> = (props:StatsProps) => {
    return (
        <div className='stats'>
            <table>
                <caption>based on {props.n} stories</caption>
                <thead>
                    <tr>
                        <th>Percent of Stories Completed</th>
                        <th>Days</th>
                    </tr> 
                </thead>
                <tbody>
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