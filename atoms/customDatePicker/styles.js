import styled from 'styled-components';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const Separator = styled.div`
  z-index: 1;
  margin-right: 8px;
`;

export const CalendarIcon = styled.span`
  margin-right: 20px;
  margin-top: 13px;
`;

export const Container = styled.div`
    display: flex;
    align-items: start;
    position: relative;
    .calendar-icon {
      width: 18px;
      height: 18px;
    }
  .react-datepicker-wrapper {
    max-width: 84px;

    .react-datepicker__input-container {
      input {
        border: none !important;
        max-width: 84px;
      }
    }
  }
`;

export const StyledInput = styled.div`
  cursor: pointer;
  height: 2.5em;
  line-height: 2.5em;
  border: 0px;
  background: transparent;
  width: 100%;
  color: ${(p) => p.theme.BLACK};
  text-align: center;
`;

export const StyledInputContainer = styled.span`
  background-color: rgb(255, 255, 255);
  position: relative;
  flex: 1 1;
  text-align: center;
  color: inherit;
  display: flex;
  width: 180px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const DatePickerContainer = styled.div`
  box-shadow: 2px 5px 16px 0px #b9b9bd;
  border-radius: 10px;
  overflow: hidden;
  z-index: 9;
  position: absolute;
  top: 50px;
`;
