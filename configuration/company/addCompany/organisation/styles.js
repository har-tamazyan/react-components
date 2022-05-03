import styled, { css } from 'styled-components';
import CustomSkillDropdown from 'src/web/ats/components/common/customSkillDropdown';
import Input from 'src/web/ats/components/atoms/input';
import { FLEX } from 'src/web/ats/components/common/styles';

export const OrganisationSubSection = styled.div`
  max-width: 100%;
`;

export const Container = styled.div`
  width: 100%;
  padding : 10px;
  margin-bottom: 32px;
  border: 1px dashed ${(p) => p.theme.RHINO};
`;


export const InputContainerList = styled.div`
  display: grid;
  margin-top: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 12px;
`;

export const SubContainer = styled.div`
  margin-bottom: 32px;
`;

export const CustomDropdown = styled.div`
  display: grid;
  grid-template-columns: ${(p) => (p.withThreeColumn ? 'repeat(2, calc(50% - 22px))' : 'repeat(2, calc(50% - 22px))')};
  grid-column-gap: 44px;
  grid-row-gap: 28px;
  max-width: 90%;
  margin-top: 10px;
`;

export const StyledInput = styled(Input)`
  color: ${(p) => p.theme.TUNDORA};
  background-color: ${(p) => p.theme.WHITE};
  width: 308px;
`;

export const SelectSubFunctionContainer = styled.div`
  display: flex;
`;

export const DropdownWrapper = styled.div`
  & > div {
      width: 350px;
  }
`;

export const AddIconContainer = styled.span`
  display: block;
  height: 44px;
  line-height: 44px;
  margin-left: 16px;
  margin-top: 25px;

  > img {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

export const DeleteIconContainer = styled(AddIconContainer)``;

export const DepartmentsTitle = styled.div`
  margin-bottom: 8px;
  margin-top: 15px;

  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
   ${(p) => p.theme.XL_DESKTOP`
      margin-bottom: 6px;
    `}
`;

export const DepartmentsDropdown = styled(CustomSkillDropdown)`
   height: 44px;
   > div {
    font-size: ${(p) => p.theme.MEDIUM};
    margin-bottom: 10px;
  }
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top : 20px
`;

export const SubmitButton = styled.button`
  border: 0px;
  border-radius: 8px;
  height: 44px;
  width: 240px;
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

const COMMON_TITLE = css`
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
  margin-bottom: 8px
`;

export const SelectTitle = styled.span`
  display: block;
  ${COMMON_TITLE};
`;

export const editWrapper = styled.div`
max-width: 100%;
border: 1px solid ${(p) => p.theme.ALTO};
background-color: ${(p) => p.theme.WHITE_LILAC};
border: 1px solid #D6D3D3;
background-color: #FAFBFD;
padding: 6px 12px;
border-radius: 6px;
position: relative;
display: flex;
flex-direction: row;
flex-wrap: wrap;
min-height: 44px;

p{
  display:flex;
  flex-wrap: wrap;
}

`;

export const SelectedMultiOptionChip = styled.div`
 width: fit-content;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  padding: 7px 6px;
  margin-right: 6px;
  margin-bottom: 6px;
  border-radius: 15px;
  ${FLEX('center')};

  ${(p) => p.isDisabled && css`
    background-color: ${p.theme.ALTO};
    border: 1px solid ${p.theme.SILVER};
  `}
`;

export const SelectedMultiOptionTextChip = styled.span`
  font-size:  ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.PORT_GORE};
  position: relative;
  padding-right: 4px;
  margin-right: 4px;
`;

export const EditIcon = styled.div`
  right: 5px;
  position: absolute;
  cursor: pointer;
`;

