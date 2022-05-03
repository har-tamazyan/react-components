import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.form`
  padding: 24px;
  background-color: ${(p) => p.theme.WHITE};
  width: 500px;
  border-radius: 8px;
`;

export const Title = styled.p`
  margin-bottom: 24px;
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
`;

export const SelectJob = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid ${(p) => p.theme.ALTO}80;
`;

export const SelectAdditionalDetails = styled.div`
  margin: 12px 0;
`;

export const JobReassignButtons = styled.div`
  margin-top: 20px;
  width: 100%;
  ${FLEX(null, 'center')};
`;

export const JobReassignPrimaryButton = styled.button`
  width: 120px;
  padding: 10px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 6px;
  color: ${(p) => p.theme.WHITE};
  margin-right: 12px;
`;

export const JobReassignSecondaryButton = styled.button`
  width: 120px;
  padding: 10px;
  border: 1px solid currentColor;
  border-radius: 6px;
  color: ${(p) => p.theme.DOVE_GRAY};
`;
