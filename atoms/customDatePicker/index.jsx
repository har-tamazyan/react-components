import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRangePicker, createStaticRanges } from 'react-date-range';
import CalendarIcon from 'src/web/ats/assets/icons/calendar.svg';
import 'src/web/ats/components/atoms/customDatePicker/index.css';
import * as S from './styles';
import { sideBarOptions } from './Dates';

const CustomDatePicker = ({
  onDateChange, name, selectionRange,
}) => {
  const datePickerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const sideBar = sideBarOptions();

  const staticRanges = [
    ...createStaticRanges(sideBar),
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef?.current && !datePickerRef?.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [datePickerRef]);

  const getSelectionRange = (selection, dateType) => {
    if (selection[dateType]) {
      return moment(selection[dateType]).format('MMM, DD YYYY');
    }

    return moment().format('MMM, DD YYYY');
  };

  return (
    <S.Container>
      <S.CalendarIcon>
        <img
          onClick={(e) => {
            e.preventDefault();
            if (!open) setOpen(true);
          }}
          className="calendar-icon"
          src={CalendarIcon}
          alt=''
        />
      </S.CalendarIcon>
      {
        open
          ? (
            <S.DatePickerContainer ref={datePickerRef}>
              <DateRangePicker
                ranges={[selectionRange]}
                open={open}
                onChange={(item) => onDateChange(item.selection, name)}
                showSelectionPreview
                moveRangeOnFirstSelection={false}
                inputRanges={[]}
                direction="horizontal"
                preventSnapRefocus
                calendarFocus="backwards"
                staticRanges={staticRanges}
              />
            </S.DatePickerContainer>
          )
          : (
            <S.StyledInputContainer>
              <S.StyledInput onClick={() => setOpen(true)}>{getSelectionRange(selectionRange, 'startDate')}</S.StyledInput>
              <p> - </p>
              <S.StyledInput onClick={() => setOpen(true)}>{getSelectionRange(selectionRange, 'endDate')}</S.StyledInput>
            </S.StyledInputContainer>
          )
      }
    </S.Container>
  );
};

CustomDatePicker.propTypes = {
  selectionRange: PropTypes.object,
  onDateChange: PropTypes.func,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

export default CustomDatePicker;
