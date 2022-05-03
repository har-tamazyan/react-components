import styled from 'styled-components';

export const confirmImgBlock = styled.div`
    text-align: center;
`;

export const confirmHeading = styled.div`
    font-size:24px;
    line-height:35px;
    color:#333333;
    padding:30px 0 20px 0;
    text-align: center;
`;
export const confirmBtnBlock = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`;

export const confirmViewBtn = styled.button`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #1C1F52;
    border-radius: 12px;
    opacity: 0.9;
    letter-spacing: -0.06px;
    color: #1C1F52;
    font-size:18px;
    line-height:24px;
    text-align:center;
    width: 194px;
    height: 56px;
    display:flex;
   justify-content: center;
    align-items: center;
`;
export const confirmAddBtn = styled.button`
    background: #1C1F52 0% 0% no-repeat padding-box;
    border-radius: 12px;
    opacity: 0.9;
    text-align:center;
    letter-spacing: -0.06px;
    color: #FFFFFF;
    font-size:18px;
    line-height:24px;
    width: 266px;
    height: 56px;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-left:24px;
`;

export const FullscreenButton = styled.button`
    width: 100%;
    text-align: end;
    margin-bottom: 10px;
`;

export const PhaseContainer = styled.div`
  background: ${(p) => p.theme.WHITE};
  height: 100%;
  position: relative;
  margin-top: 10px;
  margin-bottom: 80px;
  padding: ${(p) => (p.active ? '40px' : 0)};
  ${(p) => (p.active ? 'overflow-y: auto;' : '')};
`;
