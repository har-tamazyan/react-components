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


export const WideInnerContainer = styled.form`
  max-width: 100%;
`;
