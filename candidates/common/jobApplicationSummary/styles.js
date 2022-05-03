import styled from 'styled-components';
import { FLEX, FADE_ANIMATION_IN } from 'src/web/ats/components/common/styles';

export const SummaryContainer = styled.div`
  margin: auto;
  width: 840px;
  height: fit-content;
  background: ${(p) => p.theme.WHITE};
  ${FADE_ANIMATION_IN};
  border-radius: 14px 14px 0 0;
`;

export const Heading = styled.h3`
  padding: 20px 30px 10px;
  border-bottom: 1px solid ${(p) => p.theme.ALTO}4D;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.SUB_HEADING};
  ${FLEX('center', 'space-between')}
`;

export const MetaDetails = styled.div`
  padding: 20px 30px 16px;
`;
export const CompanyLogo = styled.img`
  max-height: 25px;
  margin-bottom: 15px;
`;

export const CompanyDefaultLogo = styled.div`
  max-height: 25px;
  margin-bottom: 15px;

  > svg {
    display: block;
    fill: ${(p) => p.theme.PRIMARY_COLOR};
  }
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
  margin: 0;
  padding: 0;
  color: ${(p) => p.theme.SHARK};
`;
export const JobDetailValue = styled.p`
  margin: 0;
  padding: 0;
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
