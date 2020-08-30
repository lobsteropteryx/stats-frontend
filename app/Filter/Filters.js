import React from 'react';
import BoardsListContainer from './List/BoardsListContainer';
import StartColumnsListContainer from './List/StartColumnsListContainer';
import EndColumnsListContainer from './List/EndColumnsListContainer';
import SubmitButtonContainer from './SubmitButton/SubmitButtonContainer';

const Filters = () => {
    return (
        <div className="filterGroup">
            <BoardsListContainer />
            <StartColumnsListContainer />
            <EndColumnsListContainer />
            <SubmitButtonContainer />
        </div>
    );
};

export default Filters;