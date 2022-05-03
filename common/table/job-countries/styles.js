import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const JobCountryContainer = styled.div`
  position: relative;
`;

export const JobCountryInnerWrapper = styled.div`
  position: relative;
  display: inline-block;
  ${FLEX('flex-start')};
`;

export const JobCountry = styled.div`
  font-weight: ${(p) => p.theme.BOLD_FONT};
  display: inline-block;
  position: relative;
  left: -10px;
`;

export const RemoteBadge = styled.div`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 15px;
  background-color: ${(p) => p.theme.SUCCESS};
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.X_SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const JobCountryMoreLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: ${(p) => p.theme.MATISSE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const MenuDropdownContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 15px;
  right:-2px;
  width: 150px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_16};
  padding: 12px 0;
  box-shadow: 0 6px 10px ${(p) => p.theme.BLACK_RGB_16};
`;
export const DropDownWrapper = styled.div`
 overflow-y: auto;
 display: block;
 max-height: 250px; 
`;

export const MenuDropdownItem = styled.div`
  padding: 8px 12px;
  ${FLEX('center')};
  cursor: pointer;

  > p {
    font-size: ${(p) => p.theme.SMALL};
  }
`;

export const MoreMenuContainer = styled.div`
  display: inline-block;
      top: 8px;
    position: relative;
`;
