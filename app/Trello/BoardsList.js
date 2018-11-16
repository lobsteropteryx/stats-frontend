import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const BoardsList = (props) => {
    return (
        <Select
            options={props.boards}
            onChange={props.onBoardChange}
        />
    );
};

BoardsList.propTypes = {
    boards: PropTypes.array.isRequired,
    onBoardChange: PropTypes.func.isRequired
};

export default BoardsList;