import React, { MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import ExportButton from '../ExportButton/ExportButton';
const spinner = require('../../../images/spinner.svg');

interface QueryControlsProps {
    onSubmit:MouseEventHandler,
    exportEnabled:boolean,
    exportUrl:string,
    exportFilename:string,
    spinnerClass:string
}

const QueryControls = (props:QueryControlsProps) => {
    return (
        <div className='submitButton'>
            <button onClick={props.onSubmit}>Submit</button>
            <ExportButton 
                enabled={props.exportEnabled} 
                url={props.exportUrl} 
                filename={props.exportFilename} 
            />
            <img className={props.spinnerClass} src={spinner} />
        </div>
    );
};

QueryControls.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default QueryControls;