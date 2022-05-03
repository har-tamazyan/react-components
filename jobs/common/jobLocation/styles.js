import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 32px;
  grid-column-start: 1;
    grid-column-end: 3;
`;

export const CustomDropdown = styled.div`
  display: grid;
  grid-template-columns: ${(p) => (p.withThreeColumn ? 'repeat(3, calc(50% - 22px))' : 'repeat(2, calc(50% - 22px))')};
  grid-column-gap: 44px;
  grid-row-gap: 28px;
`;

export const SelectMemberDropdown = styled.div`
  display: flex;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PromptCheckBoxLabel = styled.label`
  font-size:  ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.PORT_GORE};
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  
  
  > input {
    margin-right: 5px;
    width: ${(p) => p.theme.MEDIUM};
    height: ${(p) => p.theme.MEDIUM};
    :disabled {
      cursor: not-allowed;
    }
  }
`;
export const DropdownTitle = styled.span`
  display: block;
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const DropdownWrapper = styled.div`
  & > div {
      width: 378px;
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

  > img {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

export const EmptyTitleFill = styled.div`
  height: 25px;
`;

export const DeleteIconContainer = styled(AddIconContainer)``;

export const LightText = styled.p`
  font-weight: 300;
`;

export const ViewModeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 8px;
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
