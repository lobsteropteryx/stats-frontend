import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DateProps {
    label:string,
    date:Date,
    onChange:Function
}

const Date = (props:DateProps) => {
    return (
        <div className='filterControl'>
            <label>{props.label}</label>
            <DatePicker
                className="dateFilter"
                selected={props.date}
                onChange={(e:Date) => props.onChange(e ? e.toISOString() : null)}
            />
        </div>
    );
};

Date.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default Date;