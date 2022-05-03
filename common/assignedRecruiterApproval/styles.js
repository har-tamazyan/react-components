import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  ${FLEX('center', 'center')};
  background: ${(p) => `linear-gradient(to bottom, ${p.theme.WHITE} 40%, ${p.theme.WATERLOO} 40%)`};
`;

export const PromptContainer = styled.div`
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0px 13px 61px ${(p) => p.theme.BLACK_RGB_8};
  border-radius: 8px;
  padding: 30px 60px 40px;
  text-align: center;
  margin-top: -180px;

  ${(p) => p.theme.TABLET`
    width: calc(100% - 48px);
    padding: 30px 30px 30px;
    margin-top: -100px;
    box-shadow: 0px 3px 6px ${p.theme.BLACK_RGB_16};
  `};
`;

export const MainLogoIMG = styled.img`
  display: block;
  margin: 0 auto;
  width: 250px;
`;

export const PromptTitle = styled.h3`
  padding-top: 48px;
  text-align: center;
  font-size: ${(p) => p.theme.XXX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SHARK};

  ${(p) => p.theme.TABLET`
    padding-top: 32px;
    font-size: ${p.theme.X_LARGE};
  `};
`;

export const StatusImage = styled.img`
  display: block;
  margin: 10px auto 20px;
  height: 60px;
  width: 60px;
`;

export const PromptNote = styled.p`
  font-size: ${(p) => p.theme.LARGE};
  padding: 8px 0 12px;
  color: ${(p) => p.theme.DOVE_GRAY};

  ${(p) => p.theme.TABLET`
    font-size: ${p.theme.MEDIUM};
  `};
`;

export const PromptButtons = styled.div`
  margin-top: 40px;
  width: 100%;
  ${FLEX(null, 'space-around')};
`;

export const PromptPrimaryButton = styled.button`
  padding: 10px;
  width: 120px;
  height: 35px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  color:${(p) => p.theme.WHITE};
`;

export const ColoredText = styled.span`
  color: ${(p) => (p.error ? p.theme.ERROR : p.theme.SUCCESS)};
`;
