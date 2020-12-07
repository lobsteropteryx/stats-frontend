import React from 'react';
import BoardsListContainer from './BoardsListContainer';
import SubmitButtonContainer from './SubmitButton/SubmitButtonContainer';

const Filters = () => {
    return (
        <div className="filterGroup">
            <BoardsListContainer />
            <SubmitButtonContainer />
        </div>
    );
};

export default Filters;