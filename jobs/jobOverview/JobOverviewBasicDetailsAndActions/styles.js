import styled, { css } from 'styled-components';
import { FLEX, Card } from 'src/web/ats/components/common/styles';

const CommonFontStyle = css`
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.SHARK};
  margin-top: 4px;
`;

const ADD_DOT_BEFORE_TEXT = css`
  &::before {
    position: absolute;
    content: '•';
    display: inline-block;
    font-size: 12px;
    width: 12px;
    height: 12px;
    top: 0;
    left: -14px;
    ${FLEX('center', 'center')};
  }
`;

const CommonButtonStyleUnits = {
  width: '192px',
};

const CommonButtonStyle = css`
  width: 100%;
  width: ${CommonButtonStyleUnits.width};
  height: 38px;
  line-height: 38px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  border-radius: 20px;
  ${FLEX('center', 'center')};
`;

export const DetailsAndActions = styled(Card)`
  padding: 14px 18px;
  box-shadow: 1px 2px 2px ${(p) => p.theme.BLACK_RGB_16};
  ${FLEX(null, 'space-between')};
`;

export const Details = styled.div`
  ${FLEX()};
`;

export const CompanyLogoContainer = styled.div`
  margin-right: 18px;
  width: 64px;
  height: 100%;

  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const CompanyDefaultLogo = styled.div`
  > svg {
    fill: ${(p) => p.theme.PRIMARY_COLOR};
  }
`;

export const Jobname = styled.h4`
  font-size: ${(p) => p.theme.XX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
  margin-bottom: 4px;
  ${FLEX('center')};

  img {
    width: 1rem;
    &:hover {
      cursor: pointer;
    }
  }

`;

export const CompanyDetails = styled.div`
  ${FLEX('flex-start')};

  > div {
    position: relative;
    ${CommonFontStyle};

    &:not(:last-child) {
      margin-right: 22px;
    }

    &:last-child {
      ${(p) => p.experience && ADD_DOT_BEFORE_TEXT};
    }

    > div {
      position: relative;
      ${(p) => p.location && ADD_DOT_BEFORE_TEXT};
    }
  }
`;

export const JobOpenPositionsAndOffers = styled.div`
  ${FLEX('', 'space-evenly')};
`;

export const CompanyAllCandidatesAndNew = styled.div`
  ${FLEX('center')};
  text-decoration: none;
`;

export const CompanyAllCandidates = styled.div`
  ${CommonFontStyle};
  color: ${(p) => p.theme.LINK_COLOR};
  text-decoration: none;
`;

export const CompanyNewCandidates = styled(CompanyAllCandidates)`
  position: relative;
  margin-left: 22px;
  ${ADD_DOT_BEFORE_TEXT};
`;

export const JobOpenPositions = styled.div`
  color: ${(p) => p.theme.DOVE_GRAY};
  text-align: center;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  span {
    font-size: ${(p) => p.theme.XX_LARGE};
    font-weight: ${(p) => p.theme.BOLD_FONT};
    position: relative;
  }
`;

export const EditPositionsValueIcon = styled.img`
  margin-left: 5px;
  cursor: pointer;
`;

export const JobOffers = styled(JobOpenPositions)`
  cursor: pointer;
  text-decoration: none;
  `;

export const ActionButtons = styled.div`
  min-width: ${CommonButtonStyleUnits.width};
`;

export const ActionPrimary = styled.button`
  ${CommonButtonStyle};
  color: ${(p) => p.theme.WHITE};
  background: linear-gradient(180deg, ${(p) => p.theme.PRIMARY_COLOR_LIGHT} 0%, ${(p) => p.theme.PRIMARY_COLOR} 100%);
  margin-top: 10px;
`;

export const ActionPrimaryDummy = styled.button`
  ${CommonButtonStyle};
  margin-top: 10px;
  pointer-events: none;
  user-select: none;
  visibility: hidden;
`;

export const ActionSecondary = styled.button`
  ${CommonButtonStyle};
  margin-top: 10px;
  color: ${(p) => p.theme.PRIMARY_COLOR};
  border: 1px solid ${(p) => p.theme.PRIMARY_COLOR};
`;

export const PromptContainer = styled.div`
  ${FLEX('', 'space-between', 'column')};
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_4};
  border-radius: 8px;
  width: ${(p) => (p.huge ? 'fit-content' : '500px')};
  min-height: 250px;
  height: fit-content;
  padding: 25px 45px 30px 25px;
`;

export const PromptTitle = styled.h3`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const PromptNote = styled.p`
  margin-top: 30px;
  padding-left: 20px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.TUNDORA};
`;

export const PromptButtons = styled.div`
  ${FLEX('', 'space-around')};
  width: 100%;
`;

export const PromptPrimaryButton = styled.button`
  width: 120px;
  height: 35px;
  padding: 10px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  color:${(p) => p.theme.WHITE};
`;

export const PromptSecondaryButton = styled.button`
  width: 120px;
  height: 35px;
  padding: 10px;
  border: 1px solid ${(p) => p.theme.DOVE_GRAY};
  border-radius: 8px;
  color : ${(p) => p.theme.DOVE_GRAY};
`;

export const PromptInputLabel = styled.p`
  margin-top: 20px;
  padding-left: 20px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.WATERLOO};
`;

export const PromptInput = styled.input`
  width: ${(p) => (p.small ? 70 : 350)}px;
  height: 50px;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 40px;
  padding: 16px;
  background-color: ${(p) => p.theme.WHISPER};
  border: 1px solid ${(p) => p.theme.ALTO};
  border-radius: 4px;
`;

export const FlexBox = styled.div`
  ${FLEX()};
`;

export const PositionsDiv = styled.div`
  width: 350px;
  color: ${(p) => p.theme.TUNDORA};
  
  > p {
    font-weight: ${(p) => p.theme.BOLD};
    font-size: 14px;
  }
  
  > ol {
    margin-top: 10px;
    padding-left: 30px ;
  }
`;


export const ViewAllText = styled.p`
  cursor: pointer;
  color: ${(p) => p.theme.WATERLOO};
  width: fit-content;
  margin: auto;
`;
