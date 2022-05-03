import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FADE_ANIMATION_IN } from '../common/styles';

export const Container = styled.main`
  grid-area: main;
  padding: 24px 44px 48px 24px;
  height: ${(p) => (p.fullHeight ? '100%' : 'calc(100vh - var(--navbar-height))')};
  background-color: ${(p) => (p.noBackground ? 'transparent' : p.theme.ATHENS_GRAY)};
  overflow-y: auto;
  will-change: opacity;
  ${FADE_ANIMATION_IN('MEDIUM_TRANSIT')};
`;

const SubContainer = styled.div`
  max-width: var(--main-max-width);
  margin: auto;
`;

export const Title = styled.div`
  padding-bottom: 12px;
  display: inline-block;
  font-family: var(--font-family-head);
  font-weight: ${(p) => p.theme.EXTRA_BOLD_FONT_HEAD};
  font-size: ${(p) => p.theme.HEADING};
  color: ${(p) => p.theme.TUNDORA};
  text-transform: capitalize;
`;

const Main = ({
  children,
  title,
  noBackground = false,
  fullHeight = false,
}) => (
  <Container fullHeight={fullHeight} noBackground={noBackground}>
    <SubContainer fullHeight={fullHeight} >
      {title ? <Title>{title}</Title> : null}
      {children}
    </SubContainer>
  </Container>
);

Main.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  noBackground: PropTypes.bool,
  fullHeight: PropTypes.bool,
};

export default Main;
