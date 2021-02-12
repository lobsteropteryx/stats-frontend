import React, {useRef} from 'react';
import PropTypes from 'prop-types';

const ExportButton = (props) => {
    const downloadAnchor = useRef(null);
    const exportData = (event) => {
        event.preventDefault();
        downloadAnchor.current.click(); 
        URL.revokeObjectURL(props.url);
    };

    return (
        <div className='exportButton'>
            <button onClick={e => exportData(e, data.content)} disabled={!props.enabled}>Export</button>
            <a ref={downloadAnchor} href={props.url} download={props.filename} />
        </div>
    );
};

ExportButton.propTypes = {
    enabled: PropTypes.bool.isRequired
};

export default ExportButton;