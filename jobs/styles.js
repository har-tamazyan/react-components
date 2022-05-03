import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 24px;
  padding: 16px 32px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: 14px;
  min-height: 800px;
`;

export const JobNameContainer = styled.div`
inline-size: 195px;
overflow-wrap: break-word;
`;


export const JobName = styled.div`
  color: ${(p) => p.theme.LINK_COLOR};
  cursor: pointer;
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const BadgeWrapper = styled.div`
  > div {
    margin: 5px 0;
  }
`;

export const SyndicationPartnersContainer = styled.div`
  display: flex;
`;

export const SyndicationPartnersDisplay = styled.div``;

export const SyndicationPartnersHiddenCount = styled.div`
  display: block;
  width: fit-content;
  line-height: 18px;
  margin-left: 5px;
  color: ${(p) => p.theme.CURIOUS_BLUE};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const SyndicationPartnersHidden = styled.div``;

export const HiddenSyndicationPartnerName = styled.div`
  margin: 10px 0;
  text-align: left;
`;
