import styled, { css } from 'styled-components';
import { FLEX } from '../../common/styles';

const AvatarContainer = styled.div`
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  border-radius: 50%;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.X_LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  letter-spacing: 0.05rem;
  user-select: none;
  ${FLEX('center', 'center')};

  ${(p) => (
    p.size === 'md' && css`
      min-height: 44px;
      min-width: 44px;
    `
  )}

  ${(p) => p.type === 'live-cv' && css`
    width: 90px;
    height: 90px;
    margin: auto;
    font-size: ${p.theme.SUB_HEADING};

    ${p.theme.TABLET`
      min-height: 44px;
      min-width: 44px;
      font-size: ${p.theme.X_LARGE};
      width: unset;
      height: unset;
      margin: unset;
    `}
  `}
  
  ${(p) => (
    p.size === 'sm' && css`
      min-height: 36px;
      min-width: 36px;
      font-size: ${p.theme.MEDIUM};
      font-weight: ${p.theme.BOLD_FONT};
    `
  )}
`;

export { AvatarContainer };
