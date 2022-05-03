import styled, { css } from 'styled-components';

export const WaitingIndicatorContainer = styled.div`
  ${(p) => {
    if (p.fullWidth) {
      return css`
        width: 100%;
        height: max-content;
        text-align: center;
      `;
    }
    if (p.fullHeight) {
      return css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      `;
    }
    if (p.fullScreen) {
      return css`
        width: 100%;
        height: calc(100vh - var(--navbar-height));
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `;
    }
    if (p.fitParent) {
      return css`
      display: flex;
      align-items: center;
      justify-content: center;
      `;
    }
    return null;
  }};

  ${(p) => p.isFixed && css`
    z-index: var(--spinner-z-index);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    margin: auto;
  `}
  ${(p) => p.hasBackground && css`
  backdrop-filter: blur(4px);
`}
`;

export const WaitingIndicatorSubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  ${(p) => p.hasBackground && css`
    padding: 24px 32px;
    background-color: rgba(255, 255, 255, 0.75);
    box-shadow: 6px 6px 54px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  `}
`;

export const WaitingIndicatorLoader = styled.div`
  display: inline-block;
  border: 1px solid #EFEFF2;
  border-radius: 50%;
  border-top: 1px solid currentColor;
  width: 16px;
  height: 16px;
  filter: ${(p) => p.isModal && 'invert(1)'};
  animation: wi-spin 1s linear infinite;

  @keyframes wi-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const WaitingIndicatorMsg = styled.div`
  margin-top: ${(p) => p.isMsgAvailable && '6px'};
  font-size: 12px;
  font-weight: ${(p) => (p.isModal ? 'inherit' : p.theme.LIGHT_FONT)};
  text-transform: uppercase;
  letter-spacing: 0.025rem;
  color: ${(p) => p.theme.SHARK};
  text-shadow: 0px 0px 0.6px #FFF;
  transition: all 160ms ease;
  filter: ${(p) => p.isModal && 'invert(1)'};
`;
