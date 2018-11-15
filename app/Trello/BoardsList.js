import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const BoardsList = (props) => {
    return (
        <Select
            //value={props.selectedBoard}
            //onChange={props.onBoardChange}
            options={props.boards}
        />
    );
};

BoardsList.propTypes = {
    //selectedBoard: PropTypes.object.isRequired,
    //onBoardChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default BoardsList;