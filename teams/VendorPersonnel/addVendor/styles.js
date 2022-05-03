import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';
import Input from 'src/web/ats/components/atoms/input';

export const Container = styled.form`
  width: 830px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 8px;
`;

export const HeaderContainer = styled.div`
  ${FLEX('center', 'space-between')};
  padding: 25px;
  border-bottom: 1px solid ${(p) => p.theme.ALTO};
`;

export const Title = styled.h3`
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.MINE_SHAFT};
`;

export const CloseIcon = styled(Title)`
  font-size: ${(p) => p.theme.XXX_LARGE};
  cursor: pointer;
`;

export const FormContainer = styled.div`
  padding: 25px;
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
`;

export const DropdownTitle = styled.span`
  display: block;
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const ActionContainer = styled.div`
  ${FLEX('center', 'space-between')};
  margin: 54px auto 24px;
`;

export const ToggleContainer = styled.div`
  display: flex;
`;

export const SendLoginCredTitle = styled.h4`
 color: ${(p) => p.theme.MINE_SHAFT};
 opacity: 0.8;
 margin: 0 10px 10px 0;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  max-width: 160px;
  display: block;
  padding: 12px 20px;
  background-color: ${(p) => p.theme.PORT_GORE};
  color: ${(p) => p.theme.WHITE};
  border-radius: 12px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;
