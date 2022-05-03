import styled from 'styled-components';

import { FLEX, FADE_ANIMATION_IN } from '../../common/styles';

export const Container = styled.div`
  margin: auto;
  width: 70%;
  min-width: 1000px;
  height: fit-content;
  background: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: ${(p) => p.theme.BORDER_RADIUS_M};
  overflow: hidden;
  ${FADE_ANIMATION_IN};
`;

export const Heading = styled.h3`
  padding: 20px 30px 10px;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.ALTO};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.SUB_HEADING};
  ${FLEX('center', 'space-between')}
`;

export const NoContent = styled.p`
  font-size: ${(p) => p.theme.X_LARGE};
  padding: 20px 30px;
  ${FLEX('center', 'space-between')}
`;

export const CloseButton = styled.button`
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
  background-color: transparent;
  position: relative;

  > img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
  :target, :active, :focus, :hover {
    transform: scale(1.25);
  }
`;

export const MetaDetails = styled.div`
  padding: 20px 30px 10px;
`;

export const CompanyLogo = styled.img`
  max-height: 25px;
  margin-bottom: 15px;
`;

export const FlexBox = styled.div`
  ${FLEX('center', 'space-between')};
  align-items: baseline;
`;

export const JobDetails = styled.div``;

export const JobTitle = styled.p`
  padding: 0;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.LARGE};
  margin: 0 0 5px;

`;

export const DetailsTable = styled.div`
  margin-top: 4px;
  display: grid;
  grid-template-columns: max-content max-content;
  text-align: left;
  grid-column-gap: 12px;
  grid-row-gap: 4px;
`;

export const Label = styled.p`
  color: ${(p) => p.theme.SHARK};
`;

export const JobDetailValue = styled.p`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const ApplicantDetails = styled.div`
  text-align: right;
`;

export const ApplicantName = styled.p`
  margin-bottom: 6px;
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const ApplicantDetail = styled.p`
  margin-top: 4px;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
`;

export const MainFormContainer = styled.div`
  height: fit-content;  
  min-height: 750px;

  padding: 24px 28px 24px;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
`;

export const TitleBar = styled.div`
  ${FLEX('flex-end', 'space-between')};
  margin-bottom: 20px;
`;

export const FormTitle = styled.p`
  margin-bottom: 3px;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.XX_LARGE};
`;

export const PS = styled.span`
  font-size: ${(p) => p.theme.SMALL};
  color:${(p) => p.theme.WATERLOO};
`;

export const Forms = styled.div`
  display: grid;
  grid-template-columns: 15fr 3px 20fr;
`;

export const VerticalSeparator = styled.div`
  width: 0;
  border: 1px solid ${(p) => p.theme.ALTO};
`;

export const CompensationBreakUpContainer = styled.div`
  padding: 20px;
  color: ${(p) => p.theme.WATERLOO};
`;
