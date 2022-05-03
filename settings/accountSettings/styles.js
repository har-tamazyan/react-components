import styled from 'styled-components';
import { FLEX } from '../../common/styles';

export const Form = styled.form`
  max-width: 60%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 32px;
`;

export const Email = styled.div`
  position: relative;
`;

export const Password = styled(Email)``;

export const PasswordHead = styled.div`
  margin-bottom: 16px;
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.PORT_GORE};
  opacity: 0.75;
`;

export const EditEmail = styled.div`
  position: absolute;
  right: 8px;
  bottom: 10px;
  width: 20px;
  height: 20px;
  ${FLEX('center', 'center')};
  cursor: pointer;

  > img {
    width: 12px;
  }
`;

export const EditPassword = styled(EditEmail)`
  opacity: 0.75;
`;

export const EditPasswordVisibility = styled(EditEmail)`
  right: 36px;
  opacity: 0.7;

  > img {
    width: 18px;
  }
`;

export const UpdateSettingsButton = styled.button`
  margin-right: 0;
  margin-left: auto;
  padding: 12px;
  width: 240px;
  border-radius: 9px;
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background-color: ${(p) => p.theme.PORT_GORE};
`;
