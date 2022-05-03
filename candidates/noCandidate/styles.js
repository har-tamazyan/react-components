import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FLEX } from '../../common/styles';

export const Container = styled.div`
  ${FLEX('center', 'center', 'column')};
`;

export const NoContentImage = styled.img`
  filter: grayscale();
`;


export const AddCandidateButton = styled(Link)`
  background-color: ${(p) => p.theme.PRIMARY_COLOR};
  border-radius: 15px;
  font-size: ${(p) => p.theme.X_LARGE};
  color: ${(p) => p.theme.FOREGROUND_COLOR};
  width: 200px;
  height: 40px;
  margin-top: 2rem;
  text-decoration: none;
  ${FLEX('center', 'center')};
`;
export const Content = styled.p`
  font-size: ${(p) => p.theme.SUB_HEADING};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  margin-top: 2rem;
`;
