import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const DropDown = ({ placeholder, options, ...otherProps }) => (

    <>
        <S.DepartmentsDropdown
            placeholder={placeholder}
            options={options}
            renderChip={false}
            showAddIcon={false}
            {...otherProps}
        />
    </>
);

DropDown.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
};

export default DropDown;
