import styled, { css } from 'styled-components';
import { Container } from 'src/web/ats/components/templates/main';
import { FLEX } from 'src/web/ats/components/common/styles';

export const MainContainer = styled(Container)`
  padding: 0;
  display: flex;
  max-height: calc(100vh - 78px);
  overflow-y: hidden;
`;

export const TableContainer = styled(Container)`
  padding: 24px 44px;
  overflow-y: unset;
  min-height: 490px;
  background: #FFFFFF;
  padding: 0 44px;
  border-radius: 24px;
  box-shadow: 6px 6px 54px rgb(0 0 0 / 16%);
  margin: 40px auto 0 auto;

  
  max-height: 700px;
  overflow-y: hidden;


  ${(p) => css`
    ${FLEX('center', !p.noRecords ? null : 'center', 'column')};
  `}
`;

export const TableReqruiterContainer = styled.div`
  ${FLEX('center', 'start', 'row')};

  div {
    ${FLEX('center', 'center', 'row')};
    width: 40px;
    height: 40px;
    font-size: 16px;
    background: #F1F4F9 0% 0% no-repeat padding-box;
    margin: 0 12px;
    font-weight: bold;
    border-radius: 50%;
    color: #8383a6;
  }
`;
