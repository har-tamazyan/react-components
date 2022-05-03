import styled, { css } from 'styled-components';
import Input from 'src/web/ats/components/atoms/input/index.jsx';
import { FLEX } from 'src/web/ats/components/common/styles';


const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const InnerWrapper = styled.div`
  margin-top: 72px;
`;

export const InnerContainer = styled.form`
  ${(p) => p.theme.XL_DESKTOP`
    max-width: 90%;
  `};
`;

export const RoleSummary = styled.div`
  margin-top: 32px;
`;

export const JobDescription = styled(RoleSummary)``;

export const RoleSummaryTitle = styled.div`
  ${COMMON_TITLE};
`;

export const JobDescriptionTitle = styled(RoleSummaryTitle)``;

export const FileUploadContainer = styled.div`
  ${FLEX('flex-end', 'left')};
`;

export const FileButton = styled.input`
  padding: 0 16px;
  margin: 0px 20px 0px auto;
  border: 0;
  height: 40px;
  border-radius: 12px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background-color: ${(p) => p.theme.PORT_GORE};
  opacity: 0.9;
  cursor: pointer;
`;

export const UploadedFileContainer = styled.div`
margin-left: 20px;
position: relative;
height: 570px;
width: 817px;
border: 1px dashed ${(p) => p.theme.RHINO};
display: flex;
justify-content: center;
`;

export const UploadedFile = styled.div`
position:absolute;
top:100px;
height: 460px;
width: 757px;
margin: auto;
left: 50%;
transform: translate(-50%, 0%);
`;

export const IconsContainer = styled.div`
margin-top: 33px;
position: absolute;
right: 37px;
img {
  width: 18px;
  height: 19px;
  cursor: pointer;
}
`;
export const Arrow = styled.div`
  background-image: url(${(p) => (p.icon)});
  background-repeat: no-repeat;
  height: 34px;
  width: 34px;
  position: absolute;
  top: 50%;
  z-index: 5;
  display: ${(p) => (p.hidden ? 'none' : 'block')};
  cursor: pointer;
  ${(p) => (p.right ? `
    right: -20px;
  ` : `
  left: -20px;
  `)};
`;

export const HiddenInput = styled(Input)`
  opacity: 0;
  position: absolute;
  display: none;
`;

export const FileUpload = styled.div`
position: relative;
width: 822px;
height: 190px;
background: #F4F6F9;
padding: 30px;
margin-top:75px;
margin-bottom: 133px;
padding: 30px 70px;
img {
  position:absolute;
  top:32px;
  left:30px;
}
h2 {
  color: #030103;
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  margin-bottom: 10px;
}
p:first-of-type{
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: #030103;
}
`;

export const UploadResumeButton = styled.button`
padding: 16px;
width: 180px;
height: 50px;
background: #FFFFFF;
border: 1px solid #8083A3;
color: #030103;
text-align: center;
font-size: ${(p) => p.theme.LARGE};
font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
cursor: pointer;
position: absolute;
left:69px;
`;

export const ChosenFile = styled.p`
font-size: ${(p) => p.theme.MEDIUM};
color: #8083A3;
position: absolute;
top:129px;
`;

export const JobIntakeWrapper = styled.div`
display: flex;
`;
