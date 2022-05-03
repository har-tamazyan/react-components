import styled from 'styled-components';
import { FLEX } from './common/styles';

export const DesktopWarning = styled.div`
  text-align: center;
  margin: 20% 10px 0;
  max-width: 450px;

  width: fit-content;
  height: fit-content;
  
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 3px 8px ${(p) => p.theme.SCORPION};
  border-radius: 8px;
  
  padding: 20px 15px 30px;
  ${FLEX('center', 'space-between', 'column')};

`;

export const MainLogoIMG = styled.img`
  max-height: 50px;
`;
export const PromptNote = styled.p`
  font-size: 18px;
  color: ${(p) => p.theme.DOVE_GRAY};
  margin: 25px auto;
`;
