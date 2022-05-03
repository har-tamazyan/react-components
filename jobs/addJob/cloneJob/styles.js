import styled from 'styled-components';

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
`;

export const CloneJobPrimaryButton = styled.button`
  display: block;
  width: 120px;
  margin-top: 20px;
  padding: 10px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 6px;
  color: ${(p) => p.theme.WHITE};
  margin: 20px auto 0 auto;
`;
