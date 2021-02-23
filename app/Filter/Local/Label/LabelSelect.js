import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const LabelSelect = (props) => {
    return (
        <div className='filterControl filterList'>
            <label>{props.label}</label>
            <Select
                isMulti={true}
                value={props.value}
                options={props.options}
                onChange={props.onChange}
            />
        </div>
    );
};

LabelSelect.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default LabelSelect;