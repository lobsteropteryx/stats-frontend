import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = (props) => {
    return (
        <button onClick={props.onClick}>Submit</button>
    );
};

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default SubmitButton;