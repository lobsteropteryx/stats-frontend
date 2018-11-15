import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const BoardsList = (props) => {
    return (
        <Select
            options={props.boards}
        />
    );
};

BoardsList.propTypes = {
    boards: PropTypes.array.isRequired
};

export default BoardsList;