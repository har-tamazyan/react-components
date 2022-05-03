import styled from 'styled-components';
import Input from 'src/web/ats/components/atoms/input/index.jsx';

export const ContainerWrapper = styled.div`
margin-left: 20px;
position: relative;
height: 570px;
width: 328px;;
border: 1px dashed ${(p) => p.theme.RHINO};
display: flex;
justify-content: center;
display: flex;
flex-direction: column;
justify-content: center;
padding: 48px 17px;
`;


export const CustomDropdown = styled.div`
  margin-bottom: 15px;
`;

export const CustomInput = styled(Input)``;

export const SubmitButton = styled.button`
  border: 0;
  border-radius: 8px;
  width: 120px;
  height: 40px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;

  ${(p) => p.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `};

  &:hover {
    opacity: ${(p) => (p.disabled ? 0.5 : 0.95)};
  }
`;

export const CancelButton = styled(SubmitButton)`
  color: ${(p) => p.theme.PORT_GORE};
  background: unset;
`;

export const FormWrapper = styled.div`
`;

export const ButtonSection = styled.div`
display: flex;
justify-content: flex-end;
margin-top: 10px;
`;

export const CommentSectionContainer = styled.div`
height: 370px;
overflow-y: auto;
margin-top: 15px;
`;

export const CommentSectionItem = styled.div`
height: fit-content;
border-bottom: 1px solid ${(p) => p.theme.PORT_GORE};
padding-top: 20px;
padding-bottom: 10px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const AvatarWrapper = styled.div`
  & > div {
    min-width:  30px;
    min-height: 30px;
    font-size: ${(p) => p.theme.MEDIUM};
    font-weight: ${(p) => p.theme.BOLD_FONT};
  }
`;

export const ProfileNameAndTimeStampContainer = styled.div`
  padding: 6px 0 0 5PX;
`;

export const ProfileName = styled.p`
  color: #323462;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const CommentTimeStamp = styled.div`
  color: ${(p) => p.theme.SILVER_CHALICE};;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  margin-bottom: 10px;
`;

export const Comment = styled.div`
`;

export const CommentText = styled.p`
  color: #323462;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  margin-bottom: 10px;
`;

export const CommentFitment = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => p.theme.SALEM};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;
