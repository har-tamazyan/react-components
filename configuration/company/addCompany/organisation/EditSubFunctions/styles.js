import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const FormFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 12px;
    column-gap: 12px;
    margin-bottom: 20px ;

`;

export const Container = styled.form`
  width: 550px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 8px;
`;

export const SubContainer = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h2`
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.MINE_SHAFT};
  padding: 15px 25px 0;
`;

export const SubTitle = styled.h3`
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.MINE_SHAFT};
  padding: 15px 25px 0;
`;

export const PromptButtons = styled.div`
  ${FLEX('', 'center')};
  width: 100%;
  column-gap: 25px;
`;

export const PromptPrimaryButton = styled.button`
  width: 150px;
  height: 44px;
  padding: 10px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 6px;
  color:${(p) => p.theme.WHITE};
  margin-right: 12px;
  border: 1px solid transparent;
`;

export const PromptSecondaryButton = styled(PromptPrimaryButton)`
  border-color: ${(p) => p.theme.DOVE_GRAY};
  color : ${(p) => p.theme.DOVE_GRAY};
  background-color: transparent;
`;

export const ConfirmButton = styled(PromptPrimaryButton)`
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.PORT_GORE};
`;


export const DeleteIconContainer = styled.span`
    position: relative;
    left: 16rem;
    bottom: 32px;
    cursor: pointer;

    > img {
      width: 15px;
      height: 15px;
    }
`;
export const AddIconContainer = styled(DeleteIconContainer)`
  left: 16.5rem;
`;


export const FormContainer = styled.form`
  max-height: calc(100vh - 100px);
  overflow-y: scroll;
  margin: auto;
  padding: 25px;
`;

export const MainContainer = styled.div`
  width: 15rem;
  height: 44px;
`;
