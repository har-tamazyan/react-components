import styled, { css } from 'styled-components';
import Input from 'src/web/ats/components/atoms/input';
import { FLEX, TRUNCATE_TEXT } from 'src/web/ats/components/common/styles';

export const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const BasicInfoWrapper = styled.form`
  max-width: 800px;

  ${(p) => p.theme.XL_DESKTOP`
    max-width: 90%;
  `};
`;

export const BasicInfoSubWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 28px;
  margin: 24px 0;
`;

export const SelectJobAndUploadResume = styled.div`
  > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 48px;
  }
`;

export const Divider = styled.div`
  margin-top: 36px;
  width: 100%;
  border-top: 1px solid ${(p) => p.theme.ALTO}80;
`;

export const CustomDropdown = styled.div`
  > div {
    height: 44px;
    max-width: 370px;

    ${(p) => p.theme.XL_DESKTOP`
      height: 40px;
    `};
  }
`;

export const DropdownTitle = styled.span`
  display: block;
  ${COMMON_TITLE};
`;

export const CheckboxInput = styled(Input)`
  > input {
    height: unset;
    width: unset;
  }
`;

export const TextArea = styled.textarea`
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

export const TextAreaTitle = styled.div`
  ${COMMON_TITLE};
`;

export const AddressTitle = styled.div`
  ${COMMON_TITLE};
`;

export const NoticePeriod = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  grid-gap: 28px;
`;

export const NoticePeriodCheckItems = styled.div`
  ${FLEX('center')};
  margin-top: 18px;

  > div {
    ${FLEX('center')};
    color: ${(p) => p.theme.WATERLOO};

    &:nth-child(2) {
      > span {
        margin-left: 24px;
      }
    }

    > span {
      position: relative;
      margin-right: 6px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 0 0.6px ${(p) => p.theme.DOVE_GRAY};
      cursor: pointer;

      > img {
        position: absolute;
        top: 5px;
        left: 4px;
      }
    }
  }
`;

export const NationalityDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 32px;
`;

export const OverallExperience = styled(BasicInfoSubWrapper)`
  grid-column-gap: 28px;
  margin: 0;
`;

export const OverallExperienceTitle = styled.div`
  ${COMMON_TITLE};
`;
export const NoOfDays = styled.div`
  ${COMMON_TITLE};
`;

export const AuthorizedInIndia = styled(NoticePeriodCheckItems)``;

export const AuthorizedInIndiaTitle = styled.div`
  ${COMMON_TITLE};
`;

export const AddAccountsWrapper = styled.div`
  margin: 32px 0;
`;

export const AccountInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 32px;
  grid-row-gap: 20px;
`;

export const AccountInputItem = styled.div``;

export const InputContainer = styled.div`
  position: relative;

  > div > input {
    padding-left: ${(p) => (p.charCount * 8 + 36)}px;
  }
`;

export const InputAdornment = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;
  border-right: 1px solid ${(p) => p.theme.ALTO};
  padding: 0 12px;
  ${FLEX('center', 'center')};
  height: 44px;
  color: ${(p) => p.theme.SILVER};

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};
`;

export const Sources = styled.div``;

export const ResumeUpload = styled.div`
  position: relative;
  ${FLEX('center')};
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 6px 12px;
  width: 100%;
  height: 44px;
  border-radius: 4px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  cursor: pointer;

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};

  > span {
    position: absolute;
    left: 0;
    opacity: 0;
    width: 100%;

    > input {
      padding: 0;
      height: unset;
      cursor: pointer;
    }
  }

  &:hover {
    background-color: ${(p) => p.theme.BLACK_RGB_8};
  }

  > div {
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    color: ${(p) => p.theme.WATERLOO};
    padding-left: 6px;
    ${FLEX('center')};

    > div {
      font-weight: ${(p) => p.theme.BOLD_FONT};
      ${TRUNCATE_TEXT()};
      max-width: 228px;
    }
  }
`;

export const InputRequiredDot = styled.div`
  position: absolute;
  bottom: 18px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.BRICK_RED};
`;

export const SourcesTitle = styled.span`
  display: block;
  ${COMMON_TITLE};
`;

export const SourcesInput = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px 24px;
`;

export const SourceInputItem = styled.div`
  ${FLEX('center')};

  > div {
    width: 100%;
  }

  > img {
    margin-left: 12px;
    width: 14px;
    height: 14px;
    cursor: pointer; 
  }
`;

export const ResumeRequired = styled.div`
  ${COMMON_TITLE};
  color: ${(p) => p.theme.BRICK_RED};
  font-size: ${(p) => p.theme.SMALL};
  opacity: 0.8;
  text-transform: unset;
  padding-top: 4px;
`;

export const ResumeTitle = styled.div`
  ${COMMON_TITLE};
`;

export const NoticePeriodTitle = styled.div`
  ${COMMON_TITLE};
`;

export const AddAccountTitle = styled.div`
  ${COMMON_TITLE};
  margin-bottom: 12px;
`;
