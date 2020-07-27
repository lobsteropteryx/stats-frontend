import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const List = (props) => {
    return (
        <div className='trelloControl trelloList'>
            <label>{props.label}</label>
            <Select
                value={props.value}
                options={props.options}
                onChange={props.onChange}
            />
        </div>
    );
};

List.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default List;