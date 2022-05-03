import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const FilterGroupContainer = styled.div`
  width: '100%';
  background: white;
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  display: 'flex';
`;

export const FilterContainer = styled.div`  
  width: auto;
  padding: 0 20px;
  display: inline-flex;
  align-items: start;
  border-right: 0.6px solid #dcdce5;
  height: 100%;
`;

export const FilterPopupWrapper = styled.div`  
  width: auto;  
  display: inline-flex;
  padding-right: 8px;
  align-items: center;
  margin-left: ${(p) => p.theme.LARGE};  
`;

export const Title = styled.div`
  font-size: ${(p) => p.theme.SUB_HEADING};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.PRIMARY_COLOR_TEXT};
  font-family: var(--font-family-head);
`;

export const TitleGroup = styled.div`
  color: ${(p) => p.theme.PRIMARY_COLOR_TEXT};
  margin-bottom: 24px;
  ${FLEX('flex-start', 'space-between', 'column')};
  h5 {
    cursor: pointer;
    border-radius: 4px;
    background:  ${(p) => p.theme.ATHENS_GRAY};
    height: max-content;
    padding: 6px;
    &:hover {
      background:  ${(p) => p.theme.PRIMARY_COLOR_LIGHT};
      color: ${(p) => p.theme.WHITE};
    }
  }

  span {
    width: 90%;
    margin: 12px 0 0 auto;
    ${FLEX(null, 'space-between')};
  }
`;

export const SubmitButton = styled.button`
  width: 100px;
  height: 30px;
  color: white;
  background-color: #0095ff;
  font-size: 12px;
  font-weight: bold;
  padding: 6px;
  cursor: pointer;
  border-radius: 4px;

  :hover {
    color: #0095ff;
    background-color: white;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;  
  border-radius: ${(p) => (p.showMore ? '10px' : '10px 10px 0 0')};
  border: 0.6px solid #D5D5D5;
  align-items: stretch;    
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FiltersBox = styled.div`
  padding: 0 20px 0 20px; 
  min-height: 50px;
  display: flex;
  align-items: center;
  border-right: 0.6px solid #dcdce5;  
`;

export const FilterTitle = styled.span`
  color: #8181a5;      
  font: normal normal 600 14px Nunito Sans;
  letter-spacing: 0px;
`;

export const TextButton = styled.button`
  display: inline-flex;
  padding: 16px 20px;
  color: ${(p) => p.theme.SHARK};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  box-shadow: -0.6px 0 0 0 ${(p) => p.theme.ALTO};
  white-space: nowrap;
  align-items: center;

  > svg {
    margin-left: 10px;
    width: 12px;
    vertical-align: top;
  }

  > img {
    width: 12px;
    vertical-align: top;
  }

  > span {
    white-space: nowrap;
  }

  .undo-icon {
    width: 15px;
    margin-right: 10px;
  }

  .bulk-action-icon {
    height: 15px;
    margin-right: 10px;
  }

  :target, :active, :focus, :hover {
    color: ${(p) => p.theme.PRIMARY_COLOR};
  }

  ${(p) => (p.type === 'filter' && css`
    font-weight: ${p.theme.EXTRA_BOLD_FONT_BASE};
    color: ${p.theme.WATERLOO};
  `)}

  ${(p) => (
    p.type === 'action' && css`
      color: ${p.theme.PRIMARY_COLOR};
    `
  )};
  
  ${(p) => (p.type === 'label' && css`
      font-weight: ${p.theme.EXTRA_BOLD_FONT_BASE};
      color: ${p.theme.WATERLOO};
      cursor: default;

      :target, :active, :focus, :hover {
        color: ${p.theme.WATERLOO} !important;
      }
  `)}
`;

export const ShowMoreWrapper = styled.div`
  display: flex;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const RightSection = styled.div`
  position: relative;
`;

export const SortByButton = styled(TextButton)`
  padding: 16px;
`;

export const FilterPopupContainer = styled.div`
  display: grid;
  grid-gap: 30px 20px;
  grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
  background-color: #fff;  
  border-radius: 0 0 10px 10px;
  border: 0.6px solid #D5D5D5;
  padding: 20px;
`;

export const ApplyFilter = styled.button`
  width: 122px;
  height: 34px;
  color: #BE3144;
  background-color: #fff;
  font: normal normal 800 14px/26px Nunito Sans;  
  cursor: pointer;
  border-radius: 4px;
  border: 0.6000000238418579px solid #D5D5D5;  
`;

export const ShowMoreLabel = styled.span`
  width: 65px
`;
