import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 14px;
  min-height: 800px;
`;

export const AddNewHMOrI = styled.button`
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

export const SearchAndAddHMOrIWrapper = styled.div`
  ${FLEX('', 'space-between')};
`;

export const UserActions = styled.div`
  ${FLEX('', 'space-between')};
  width: 100%;
  max-width: 150px;
`;
