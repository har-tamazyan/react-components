import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';
import Input from 'src/web/ats/components/atoms/input';

const COMMON_TITLE = css`
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
  margin-bottom: 8px
`;

export const FormFieldWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Container = styled.div`
  width: 980px;
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

export const PromptButtons = styled.div`
  ${FLEX('', 'center')};
  width: 100%;
`;

export const PromptPrimaryButton = styled.button`
  width: ${(p) => (p.ctaButtonWidth || '120px')};
  height: 35px;
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

export const InputFieldContainer = styled.div`
  ${FLEX('flex-end', 'left')}
`;

export const ConfirmButton = styled(PromptPrimaryButton)`
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.PORT_GORE};
`;

export const InputGroupWrapper = styled.div`
  border: 1px dashed ${(p) => p.theme.RHINO};
  padding: 24px;
  margin-top: 30px;
  margin-bottom: 40px;
  border-radius: 5px;
  ${(p) => (p.empty ? '' : `
    height: 300px;
    overflow: auto;
  `)}

`;

export const StyledInput = styled(Input)`
  color: ${(p) => p.theme.TUNDORA};
  background-color: ${(p) => p.theme.WHITE};
  width: 308px;
`;

export const InputContainerList = styled.div`
  display: grid;
  margin-top: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 12px;
`;

export const CustomDropdown = styled.div`
  display: grid;
  grid-template-columns: ${(p) => (p.withThreeColumn ? 'repeat(2, calc(50% - 22px))' : 'repeat(2, calc(50% - 22px))')};
  grid-column-gap: 44px;
  grid-row-gap: 28px;
  max-width: 90%;
  margin-top: 10px;
`;

export const DropdownWrapper = styled.div`
  & > div {
      width: 308px;
  }
`;

export const SelectSourcingChannelContainer = styled.div`
  display: flex;
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

export const ViewModeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 8px;
  line-height: 44px;
  margin-top: 25px;
`;

export const SourcingManageHeading = styled.h4`
  font-size: 13px;
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SCORPION};
`;

export const SourcerDetails = styled.h4`
  font-size: 13px;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.SILVER_CHALICE};
`;

export const FormContainer = styled.form`
  margin: auto;
  padding: 25px;
`;

export const DropdownTitle = styled.span`
  display: block;
  ${COMMON_TITLE};
`;
