import styled from 'styled-components';
import { FLEX } from '../../common/styles';


export const ModalCardContainer = styled.form`
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_4};
  border-radius: ${(p) => p.theme.BORDER_RADIUS_XS};
  
  width: 500px;
  
  padding: 25px;
`;

export const ModalCardHeading = styled.h3`
  margin-bottom: 10px;
  color: ${(p) => p.theme.SHARK};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  font-size: ${(p) => p.theme.LARGE};
`;

export const ModalCardNote = styled.p`
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.X_SMALL};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  ${FLEX('center', 'space-around')}
`;

export const ShareButton = styled.button`
  height: 35px;
  width:fit-content;

  background-color: ${(p) => p.theme.WATERLOO};
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  
  padding: 9px 14px;

  border-radius: 4px;
`;
