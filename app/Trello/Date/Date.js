import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Date = (props) => {
    return (
        <div>
            <label>{props.label}</label>
            <DatePicker
                selected={props.date}
                onChange={props.onChange}
            />
        </div>
    );
};

Date.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default Date;