import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FADE_ANIMATION_IN, FLEX } from '../common/styles';


const ButtonStyle = (color = null, background = null) => css`
    background-color: ${(p) => background || p.theme.PRIMARY_COLOR};
    border-radius: 15px;
    font-size: ${(p) => p.theme.X_LARGE};
    color: ${(p) => color || p.theme.FOREGROUND_COLOR};
    width: fit-content;
    min-width: 118px;
    padding: 14px;
    white-space: nowrap;
    border-radius: 20px;
    height: 40px;
    margin-top: 2rem;
    text-decoration: none;
    ${FLEX('center', 'center')};
  `;

export const Container = styled.div`
  ${FLEX('center', 'center', 'column')};
  padding: 24px 44px 48px 24px;
  height: calc(100vh - var(--navbar-height));
  overflow-y: auto;
  will-change: opacity;
  ${FADE_ANIMATION_IN('MEDIUM_TRANSIT')};
  flex: 1;
`;

export const SIcon = styled.img`
  height: auto;
  width: 100%;
  max-width: 390px;
  transform: translateY(-50%);
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: ${(p) => p.theme.MEDIUM_FONT};
  color: ${(p) => p.theme.PORT_GORE};
  margin: 1.5rem 0;
`;

export const Text = styled.p`
  font-size: ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.MINE_SHAFT};
`;

export const ActionWrapper = styled.div`
  margin-top: 20px;
  width: 40%;
  ${FLEX('center', 'center')};
  > button {
    ${ButtonStyle()};
    margin-right: 1.5rem;
  }
`;

export const SLink = styled(Link)`
  display: block;
  text-decoration: none;
  > button {
    ${(p) => css`
        ${ButtonStyle(p.theme.PRIMARY_COLOR, p.theme.WHITE)}
    `}
    border: 1px solid ${(p) => p.theme.PRIMARY_COLOR};
  }
`;
