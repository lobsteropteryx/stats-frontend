import React from 'react';
import PropTypes from 'prop-types';
import ExportButton from '../ExportButton/ExportButton';
import spinner from '../../../images/spinner.svg';

const SubmitButton = (props) => {
    return (
        <div className='submitButton'>
            <button onClick={props.onSubmit}>Submit</button>
            <ExportButton onClick={props.onExport} enabled={props.exportEnabled} url={props.url} filename={props.filename} />
            <img className={props.spinnerClass} src={spinner} />
        </div>
    );
};

SubmitButton.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onExport: PropTypes.func.isRequired
};

export default SubmitButton;