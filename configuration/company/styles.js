import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 14px;
  min-height: 800px;
`;

export const CompanyNameContainer = styled.div`
inline-size: 195px;
overflow-wrap: break-word;
`;


export const CompanyName = styled.div`
  color: ${(p) => p.theme.LINK_COLOR};
  cursor: pointer;
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const AddNewCompany = styled.button`
  min-width: 190px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  padding: 8px;
  color: ${(p) => p.theme.WHITE};
  border-radius: 4px;
  background: linear-gradient(180deg, ${(p) => p.theme.PRIMARY_COLOR_LIGHT} 0%, ${(p) => p.theme.PRIMARY_COLOR} 100%);
  height: 36px;
  margin: 16px;
`;

export const TabRow = styled.div`
  .tr{
    overflow:auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .tr::-webkit-scrollbar {
    display: none;
  }
`;


export const SearchAndAddCompanyWrapper = styled.div`
  ${FLEX('', 'space-between')};
`;
export const UserActions = styled.div`
  ${FLEX('', 'space-between')};
  width: 100%;
  max-width: 150px;
`;

export const InnerWrapper = styled.div`
  margin-top: 72px;
`;
export const InnerContainer = styled.form`
  max-width: 850px;
  ${(p) => p.theme.XL_DESKTOP`
    max-width: 90%;
  `};
`;
