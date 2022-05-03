import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Navbar from '../common/navbar';
import Sidebar from '../common/sidebar';

const Main = styled.div`
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  grid-template-areas:
    "sidebar navbar navbar navbar"
    "sidebar main main main";
`;

export const GlobalWrapper = styled.div`
  ${(p) => (
    p.showBackDrop && css`
      filter: blur(2px);
    `
  )};
`;

const AppWrapper = ({
  children,
}) => (
  <Main>
    <Navbar />
    <Sidebar />
    {children}
  </Main>
);

AppWrapper.propTypes = {
  children: PropTypes.node,
};

export default AppWrapper;
