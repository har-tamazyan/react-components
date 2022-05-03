import styled from 'styled-components';

export const InnerWrapper = styled.div`
  margin-top: 72px;
`;

export const InnerContainer = styled.form`
  max-width: 800px;

  ${(p) => p.theme.XL_DESKTOP`
    max-width: 90%;
  `};
`;

export const QuestionnaireItemContainer = styled.div`
  margin-top: 32px;
`;

export const Question = styled.div`
  margin-bottom: 8px;
  color: ${(p) => p.theme.SCORPION};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;
