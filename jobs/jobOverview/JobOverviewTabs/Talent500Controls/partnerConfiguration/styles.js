import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const SectionContainer = styled.div`
  padding: 20px;
  border: 1px solid ${(p) => p.theme.RHINO};
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const SectionHeader = styled.div`
  ${FLEX('center', 'space-between')}
  margin-bottom: 20px;
`;

export const SectionTitle = styled.div`
  display: inline-block;
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const SectionTableContainer = styled.div`
  overflow-y: scroll;
  height: 100px;
  position: relative;
`;

export const SectionTable = styled.div`
  display: grid;
  grid-template-columns: 30px 120px 120px 120px;
  grid-gap: 1rem;
`;

export const SectionTableHeader = styled(SectionTable)`
  margin-bottom: 10px;
`;

export const TextButton = styled.button`
  color: ${(p) => p.theme.HAVELOCK_BLUE}
`;

export const SectionMessage = styled.div`
  text-align: center;
  margin: 30px 0;
`;
