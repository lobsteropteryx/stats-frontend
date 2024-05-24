import React from 'react';
import BoardsListContainer from './BoardsList/BoardsListContainer';
import QueryControlsContainer from './QueryControls/QueryControlsContainer';

const Filters = () => {
    return (
        <div className="filterGroup">
            <BoardsListContainer />
            <QueryControlsContainer />
        </div>
    );
};

export default Filters;