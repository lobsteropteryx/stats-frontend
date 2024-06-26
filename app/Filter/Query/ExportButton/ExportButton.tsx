import React, {useRef} from 'react';
import PropTypes from 'prop-types';

interface ExportButtonProps {
    enabled:boolean,
    url:string,
    filename:string
};

const ExportButton = (props:ExportButtonProps) => {
    const downloadAnchor = useRef(null);
    const exportData = (event) => {
        event.preventDefault();
        downloadAnchor.current.click(); 
        URL.revokeObjectURL(props.url);
    };

    return (
        <div className='exportButton'>
            <button onClick={e => exportData(e)} disabled={!props.enabled}>Export</button>
            <a ref={downloadAnchor} href={props.url} download={props.filename} />
        </div>
    );
};

ExportButton.propTypes = {
    enabled: PropTypes.bool.isRequired
};

export default ExportButton;