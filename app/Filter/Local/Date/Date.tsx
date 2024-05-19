import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Date = (props) => {
    return (
        <div className='filterControl'>
            <label>{props.label}</label>
            <DatePicker
                className="dateFilter"
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