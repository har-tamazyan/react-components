import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Wrapper } from 'src/web/ats/components/candidates/addCandidates/education/styles';
import { Title } from 'src/web/ats/components/atoms/filters/styles';
import { FLEX } from 'src/web/ats/components/common/styles';

export const RootWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, 1fr);

  ${(p) => p.theme && css`
    grid-column-gap: ${p.theme.SUB_HEADING};
    grid-row-gap: ${p.theme.SUB_HEADING};
    margin: ${p.theme.SUB_HEADING} 0;
  `}
`;

export const StyledTotalJobs = styled.div`
  margin-left: ${(p) => p.theme.LARGE};
  ${FLEX('center', 'center', 'column')};

  h1 {
    normal normal 800 40px/54px Nunito Sans;
    letter-spacing: 0px;
    color: #333333;
    opacity: 1;
    margin: 0;
  }

  p {
    font: normal normal bold 18px/24px Nunito Sans;
    letter-spacing: 0px;
    color: #333333;
    opacity: 1;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  padding: 20px 48px;
  overflow-y: auto;
`;

export const SummaryWrapper = styled(Wrapper)`
  ${FLEX(null, null, 'column')};
  max-width: 100%;
  margin: 0;
  width: 543px;
  height: 560px;
  padding: ${(p) => p.theme.X_SMALL};
  > .recharts-responsive-container {
    margin: auto;
  }
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 6px 6px 54px ${(p) => p.theme.BOX_SHADOW};
  border: 0.6000000238418579px solid #A1A1A1;
  border-radius: ${(p) => p.theme.MEDIUM};
  opacity: 1;

  .view-details {
    cursor: pointer;
    ${FLEX('center')};

    ${(p) => p.disabled && css`
      cursor: not-allowed;
      user-select: none;
    `}

    img {
      margin: 0px 0px 2px 5px;
    }
  }
`;

export const SummaryNoRecordsWrapper = styled.div`
  ${FLEX('center', 'center', 'column')};
  height: calc(100% - 100px);
  `;

export const SummaryWrapperHeader = styled.div`
  ${FLEX('center', 'space-between', 'row')};
  margin: ${(p) => p.theme.LARGE};
`;

export const StyledLink = styled(Link)`
  font: normal normal bold ${(p) => p.theme.MEDIUM / p.theme.SUB_HEADING} Nunito Sans;
  letter-spacing: 0px;
  color: #126D8E; 
  opacity: 1;
  text-decoration: none;
`;

export const StyledDiseabledLink = styled.div`
  font: normal normal bold ${(p) => p.theme.MEDIUM / p.theme.SUB_HEADING} Nunito Sans;
  letter-spacing: 0px;
  color: ${(p) => p.theme.DUSTY_GRAY}; 
  opacity: 1;
  text-decoration: none;
`;

export const TableTitle = styled(Title)`
${FLEX('flex-start', 'space-between', 'row')};

${(p) => p.theme && css`
  color: ${p.theme.PRIMARY_COLOR_TEXT};
  font-size: ${p.theme.XX_LARGE};
  font-weight: ${p.theme.REGULAR_FONT};
`}
a {
  font-size: ${(p) => p.theme.SMALL};
  font-weight:bold;
  font-family:var(--font-family-base);
  color:#202224;
  cursor: pointer;
  border-radius: 4px;
  white-space: nowrap;
  background:  ${(p) => p.theme.ATHENS_GRAY};
  padding: 6px;
  &:hover {
    background:  ${(p) => p.theme.PRIMARY_COLOR_LIGHT};
    color: ${(p) => p.theme.WHITE};
  }
}
`;

export const PositionInfo = styled.span`
  display: flex;
  flex-direction: column;
`;

export const DialogDiagramContainer = styled.div`
  ${FLEX('center', 'center', 'row')};
  margin: 50px 0;
  height: 25vw;
`;

export const AnalyticsDialogDiagramInfoContainer = styled.div`
  ${FLEX('center', 'center', 'column')};

  & > div {
    ${FLEX('center', 'start', 'row')};
    width: 100%;

    span:nth-child(1) {
      margin-right: 10px;
    }
    span:nth-child(2) {
      font: normal normal 600 14px/19px Nunito Sans;
      letter-spacing: 0px;
      color: #333333;
      opacity: 1;
    }
  }
`;

export const AnalyticsDialogDiagramInfo = styled.div`
  margin-right: ${(p) => p.theme.X_SMALL};
  max-width:  ${(p) => p.theme.X_LARGE};
  width: 100%;
  height: 11px;
  ${(p) => p.fill && css`
    background-color: ${p.fill};
    width: ${p.theme.SUB_HEADING};
    height: ${p.theme.SMALL};
    border-radius: ${p.theme.LARGE};
  `}
`;
