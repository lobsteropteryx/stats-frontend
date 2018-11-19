import React from 'react';
import AuthPortalContainer from './AuthPortal/AuthPortalContainer';
import Boards from './List/Boards';
import StartColumns from './List/StartColumns';
import EndColumns from './List/EndColumns';
import StartDate from './Date/StartDate';
import EndDate from './Date/EndDate';

const Filters = () => {
    return (
        <div className="filterGroup">
            <AuthPortalContainer />
            <StartDate />
            <EndDate />
            <Boards />
            <StartColumns />
            <EndColumns />
        </div>
    );
};

export default Filters;