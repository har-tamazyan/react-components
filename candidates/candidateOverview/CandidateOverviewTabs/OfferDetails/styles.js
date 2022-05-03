import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';
import Input from 'src/web/ats/components/atoms/input';


export const OfferDetailsContainer = styled.form`
  position: relative;
  padding: 0 0 0 6px;
`;

export const EditOfferDetails = styled.div`
  border-radius: 4px;
  user-select: none;
  ${FLEX('center')};
  cursor: pointer;
  margin-left: 12px;
  ${(p) => !p.isEditOfferDetails && css`
    padding: 6px 12px;
    transition: background-color 160ms ease 0ms;
  `};

  &:hover {
    ${(p) => !p.isEditOfferDetails && css`
      background-color: ${p.theme.BLACK_RGB_4};
    `};
  };
`;

export const EditOfferDetailsIcon = styled.img`
  margin-right: 8px;
`;

export const EditOfferDetailsCancel = styled.button`
  padding: 6px 10px;
  color: ${(p) => p.theme.ERROR};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  transition: background-color 160ms ease 0ms;
  border-radius: 4px;

  &:hover {
    background-color: ${(p) => `${p.theme.ERROR}1A`};
  }
`;

export const EditOfferDetailsSave = styled(EditOfferDetailsCancel)`
  margin-left: 12px;
  color: ${(p) => p.theme.WHITE};
  background: linear-gradient(180deg, ${(p) => p.theme.PRIMARY_COLOR_LIGHT} 0%, ${(p) => p.theme.PRIMARY_COLOR} 100%);

  &:hover {
    background-color: unset;
  }
`;

export const EditOfferDetailsText = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.WATERLOO};
`;

export const EditOfferDetailsButton = styled.button`
  border-radius: 4px;
  background: transparent;
    ${FLEX('center')};
`;

export const Actions = styled.div`
  ${FLEX('center', 'flex-end')};
`;

export const InputRowContainerList = styled.div`
  display: grid;
  margin-top: 16px;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 36px;
`;

export const InputContainerList = styled.div`
  display: grid;
  margin-top: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 36px;
`;

export const StyledInput = styled(Input)`
  color: ${(p) => p.theme.TUNDORA};
  background-color: ${(p) => p.theme.WHITE};

  :disabled {
    color: ${(p) => p.theme.WATERLOO}
  }
`;

export const DatePickerContainer = styled.div`
  position: relative;
  > label {
    display: block;
  }
  
  > .react-datepicker-wrapper {
    width: 100%;
  }

  > div > div > input {
    border: 1px solid ${(p) => p.theme.ALTO};
    padding: 0 14px;
    height: 44px;
    border-radius: 4px;
    background-color: ${(p) => p.theme.WHITE_LILAC};
    width: 100%;
    ${(p) => p.theme.XL_DESKTOP`
      height: 40px;
    `};
    
    &:disabled {
      background-color: ${(p) => (p.transparentOnDisabled ? 'transparent' : p.theme.ALTO)};
    }
  }
`;


export const BaseLabel = styled.label`
  margin-bottom: 8px;
  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  ${(p) => p.capitalizeLabel && css`
    text-transform: capitalize;
  `}
  

  ${(p) => p.theme.XL_DESKTOP`
    margin-bottom: 6px;
  `}
`;

export const TextLinkButton = styled.button`
    position: absolute;
    bottom: 13px;
    right: 13px;
    color: ${(p) => p.theme.HIPPIE_BLUE};
`;

export const ResumeUpload = styled.div`
  position: relative;
  ${FLEX('center')};
  transition: background-color ${(p) => p.theme.VERY_FAST_TRANSIT} ease 0ms;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;

  > span {
    position: absolute;
    left: 0;
    opacity: 0;

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
    padding-left: 6px;
    color: ${(p) => p.theme.WATERLOO};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }
`;

export const ResumeDownload = styled(ResumeUpload)`
  margin-left: 16px;
  text-decoration: none;
`;
