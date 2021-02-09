import React from 'react';
import PropTypes from 'prop-types';
import spinner from '../../../images/spinner.svg';

const SubmitButton = (props) => {
    return (
        <div className='submitButton'>
            <button onClick={props.onSubmit}>Submit</button>
            <button onClick={props.onExport} disabled={!props.exportEnabled}>Export</button>
            <img className={props.spinnerClass} src={spinner} />
        </div>
    );
};

SubmitButton.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onExport: PropTypes.func.isRequired
};

export default SubmitButton;