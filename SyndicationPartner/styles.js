import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Main = styled.div``;

export const Title = styled.div`
  padding: 6px 0 12px;
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.LARGE};
`;

export const Wrapper = styled.div`
  padding: 20px 20px 40px 24px;
  border-radius: 14px;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.SILVER};
  background-color: ${(p) => p.theme.WHITE};
`;

export const Container = styled.div`
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 14px;
  min-height: 800px;
`;

export const AddNewPartner = styled.button`
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

export const SearchAndAddNewPartner = styled.div`
  ${FLEX('', 'space-between')};
`;
