import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Card = styled.div`
  margin: auto;
  padding: 26px 24px;
  width: 900px;
  height: fit-content;
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
`;

export const CardTitle = styled.h3`
  font-weight: ${(p) => p.theme.BOLD_FONT};
  font-size: ${(p) => p.theme.LARGE};
  color: ${(p) => p.theme.PRIMARY_COLOR_TEXT};
  margin-bottom: 15px;
`;

export const CardContent = styled.form`
  padding: 12px 60px;
`;

export const DateAndTimeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 16px;
  grid-column-gap: 60px;
`;

export const DropdownContainer = styled.div`
  & > div {
    width: 330px;
  }
`;

export const DatePickerContainer = styled.div`
width: 100%;
& .react-datepicker__input-container > div {
  background-color: ${(p) => (p.disabled ? p.theme.ALTO : 'inherit')};
}

& > div:nth-child(2) {
  width: 330px;
  border-radius: 4px;
  background-color: ${(p) => p.theme.WHITE_LILAC};
}

> div > div > input {
  width: 100%;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 0 14px;
  height: 44px;
  border-radius: 4px;

  &::placeholder {
    color: ${(p) => p.theme.WATERLOO};
  }
}

.react-datepicker__triangle {
  left: 220px !important;
}
`;

export const DatePickerLabel = styled.div`
  margin-bottom: 4px;
  color: ${(p) => p.theme.SCORPION};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const DropdownLabel = styled(DatePickerLabel)``;

export const AttendeesSectionHeading = styled(DatePickerLabel)`
  margin-bottom: 12px;
`;

export const T500AttendeesContainer = styled.div`
  margin-top: 24px;
`;
export const ClientAttendeesContainer = styled(T500AttendeesContainer)``;

export const AttendeesContainer = styled(DateAndTimeContainer)`
`;


export const AttendeeContainer = styled.div`
  display: flex;
  position: relative;
`;

export const AttendeeAction = styled.div`
  display: flex;
  position: absolute;
  ${(p) => (p.addAndDeleteStatus ? css`right: -42px;` : css`right: -22px;`)};
  height: 44px;
  & > img {
    width: 16px;
    margin: 0 2px;
  }
`;

export const ModalButtons = styled.div`
  margin-top: 20px;
  width: 100%;
  ${FLEX(null, 'center')};
`;

export const ModalPrimaryButton = styled.button`
  width: 120px;
  padding: 10px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 6px;
  color: ${(p) => p.theme.WHITE};
  margin-right: 12px;
`;

export const ModalSecondaryButton = styled.button`
  width: 120px;
  padding: 10px;
  border: 1px solid currentColor;
  border-radius: 6px;
  color: ${(p) => p.theme.DOVE_GRAY};
`;

export const RadioOptionContainer = styled.div`
  margin-top: 20px;
  ${FLEX('center')};
`;

export const RadioOption = styled.div`
  padding: 8px 12px 8px 0;
  ${FLEX('center')};
  cursor: pointer;

  > p {
    font-size: ${(p) => p.theme.MEDIUM};
  }
`;

export const RadioCircle = styled.span`
  width: 20px;
  height: 20px;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.DOVE_GRAY};
  border-radius: 50%;
  margin-right: 10px;
  ${FLEX('center', 'center')};

  > img {
    width: 8px;
  }
`;

export const CircleDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(p) => p.theme.PORT_GORE_LIGHT};
  border-radius: 50%;
`;

export const PublishLaterDetailsContainer = styled.div`
  margin-top: 20px;
`;

export const CustomDropdown = styled.div``;

export const TextArea = styled.textarea`
  margin-top: 20px;
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid ${(p) => p.theme.ALTO};
  width: 100%;
  resize: none;
  border-radius: 4px;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  color: ${(p) => p.theme.WATERLOO};

  &:focus {
    outline: 0;
    color: ${(p) => p.theme.SHARK};
  }

  &:disabled {
    background-color: ${(p) => p.theme.ALTO};
  }

  &::placeholder {
    color: ${(p) => p.theme.SILVER};
  }
`;

export const ErrorText = styled.p`
  margin-top: 10px;
  color: ${(p) => p.theme.BRICK_RED};
`;
