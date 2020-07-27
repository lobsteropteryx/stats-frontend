import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const ButtonDisplay = (props) => {
    return (
        <button onClick={props.onClick}>Submit</button>
    );
};

ButtonDisplay.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ButtonDisplay;