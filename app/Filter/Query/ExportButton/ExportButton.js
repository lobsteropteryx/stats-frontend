import React from 'react';
import PropTypes from 'prop-types';

const Export = (props) => {
    return (
        <div className='exportButton'>
            <button onClick={props.onClick} disabled={!props.enabled}>Export</button>
            <a href={props.url} download={props.filename} />
        </div>
    );
};

Export.propTypes = {
    onClick: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired
};

function exportData(event, content) {
    event.preventDefault();
    const blobl = new Blob([content]);
    const fileUrl = URL.createObjectURL(blob);
}

export default Export;