import React, { useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useAppDispatch } from '../../../hooks';
import { fetchBoards } from '../queryFilterSlice';
import { Client as ApiClient } from '../../../Api/Client';

const BoardsList = (props) => {
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(fetchBoards(new ApiClient()));
    }, []);

    return (
        <div className='filterControl filterList'>
            <label>{props.label}</label>
            <Select
                value={props.value}
                options={props.options}
                onChange={props.onChange}
            />
        </div>
    );
};

BoardsList.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default BoardsList;