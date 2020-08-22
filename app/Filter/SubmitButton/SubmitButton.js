import React from 'react';
import PropTypes from 'prop-types';
import spinner from '../../images/spinner.svg';

const SubmitButton = (props) => {
    return (
        <div className='submitButton'>
            <button onClick={props.onClick}>Submit</button>
            <img className={props.spinnerClass} src={spinner} />
        </div>
    );
};

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default SubmitButton;