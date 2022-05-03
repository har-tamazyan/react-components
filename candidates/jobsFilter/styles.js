import styled, { css } from 'styled-components';

export const Card = styled.div`
  margin: auto;
  padding: 28px 24px;
  width: 640px;
  height: fit-content;
  max-height: 90vh;
  border-radius: 14px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
`;
export const ModalTitle = styled.h3`
  font-weight: ${(p) => p.theme.BOLD_FONT};
  font-size: ${(p) => p.theme.LARGE};
  color: ${(p) => p.theme.PRIMARY_COLOR_TEXT};
  margin-bottom: 15px;
`;
export const JobSelector = styled.div`
  overflow: hidden;
  border: 1px solid ${(p) => p.theme.ALTO};
  border-radius: 8px;
`;
export const SearchBar = styled.div`
  height: 38px;
  background-color: ${(p) => p.theme.WHISPER};
  padding: 0 12px;
  border-bottom: solid 1px ${(p) => p.theme.WATERLOO};

  > img{
    height: 17px;
    width: 17px;
  }
  > input{
    margin-left: 10px;
    background-color: transparent;
    height: 38px;
    width: 90%;
    border: none;
  }
`;
export const Jobs = styled.ul`
  padding: 0 10px;
  height: 250px;
  overflow-y: auto;
`;
export const Job = styled.li`
  cursor: pointer;
  border-bottom: 1px solid rgb(129, 129, 165, 0.15);
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.TUNDORA};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.MEDIUM};
  padding: 12px;
  background-color: ${(p) => (p.isSelected ? `${p.theme.HAWKES_BLUE}70` : 'none')};

  p {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const UPI = styled.p`
  width: 20%;
`;
export const JobTitle = styled.p`
  width: 60%;
`;
export const CompanyName = styled.p`
  width: 20%;
`;
export const Label = styled.p`
  text-align: left;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
  padding-left: 10px;
  margin-bottom: 10px;
  margin-top: 20px;
`;
export const SelectedJobs = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border: 1px dashed ${(p) => p.theme.RHINO};
  border-radius: 3px;
  height: fit-content;
  max-height: 140px;
  overflow-y: auto;
`;
export const SelectedJob = styled.div`
  width: fit-content;
  margin: 0 4px 8px;
  border: 1px solid ${(p) => p.theme.RHINO};
  border-radius: 15px;
  padding: 4px 8px 4px 12px;
  display: flex;
  
  > p {
    margin-right: 10px;
  }
  > span {
    cursor: pointer;
  }
`;

export const NoJobsSelectedNote = styled.span`
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.TUNDORA};
  opacity: 0.75;
`;

export const Actions = styled.div`
  position: relative;
  margin-top: 10px;
  padding-top: 28px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(p) => p.isSelectedJobs && css`
    &::before {
      content: '';
      position: absolute;
      top: -27px;
      left: 2px;
      width: calc(100% - 10px);
      height: 16px;
      background: linear-gradient(to top, ${p.theme.WHITE} 0%, transparent 100%);
    }
  `}
`;

export const CTA = styled.button`
  width: 121px;
  height: 34px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  opacity: 0.9;
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;
