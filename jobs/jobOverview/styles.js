import styled from 'styled-components';
import { FADE_ANIMATION_IN } from '../../common/styles';

export const ModalContainer = styled.div`
  z-index: var(--modal-backdrop-z-index);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(4px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0,0,0,0.5);
  ${FADE_ANIMATION_IN};
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.div`
  z-index: var(--modal-content-z-index);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: 72px auto;
  padding: 24px;
  width: 100%;
  max-width: 1000px;
  border-radius: 12px;
  background-color: ${(p) => p.theme.WHISPER};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
  overflow: hidden;
  ${FADE_ANIMATION_IN};

  ${(p) => p.theme.TABLET`
    padding: 12px;
    width: 95%;
  `};
`;

export const ModalBody = styled.div`
  display: grid;
  grid-gap: 54px;
`;

export const ModalClose = styled.div`
  z-index: var(--modal-close-z-index);
  position: absolute;
  top: 0;
  right: 0;
  margin: 16px 18px 0 0;
  width: 44px;
  height: 44px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 50%;
  border: 1px solid ${(p) => p.theme.DOVE_GRAY};
  cursor: pointer;

  &::before,
  &::after {
    content: ' ';
    position: absolute;
    top: 7px;
    left: 21px;
    height: 28px;
    width: 1px;
    background-color: ${(p) => p.theme.DOVE_GRAY};
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;
