import React from 'react';
import Boards from './List/Boards';
import StartColumns from './List/StartColumns';
import EndColumns from './List/EndColumns';
import StartDate from './Date/StartDate';
import EndDate from './Date/EndDate';
import Button from './Submit/Button';

const Filters = () => {
    return (
        <div className="filterGroup">
            <Boards />
            <StartColumns />
            <EndColumns />
            <StartDate />
            <EndDate />
            <Button />
        </div>
    );
};

export default Filters;