import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 32px;
  border: 1px dashed ${(p) => p.theme.RHINO};
`;

export const AddSkill = styled.div`
  width: 100%;
`;

export const SelectSkills = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 4fr;
`;

export const EmptySelectSkillsSection = styled.div`
   height: 25px;
`;

export const SelectSkillsHeading = styled.h4`
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  padding-left: 10px;
  margin: 10px 0;
`;

export const SkillFamily = styled.div`
  width: 100%;
  padding: 20px 15px 20px 20px;
`;

export const SkillsFamilyNameList = styled.div`
  box-shadow: 0px 3px 12px #0000000D;
  margin: 10px 0;
  border-radius: 12px;
  height: 200px;
  overflow-y: auto;
  & > div:first-child {
    border-radius: 12px 12px 0 0;
  }
  & > div:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

export const SkillFamilyName = styled.div`
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  padding: 18px 12px;
  background-color: ${(p) => (p.selected ? p.theme.ATHENS_GRAY : p.theme.WHITE)};
  :hover {
    background-color: ${(p) => p.theme.ATHENS_GRAY};
  }
`;



export const Skills = styled.div`
  padding: 20px 20px 20px 15px;
`;

export const SkillsList = styled.div`
  background-color: ${(p) => (p.theme.ATHENS_GRAY_DARK)};
  margin: 10px 0;
  border-radius: 4px;
  overflow-y: auto;
  max-height: 200px;
`;

export const SkillName = styled.div`
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  padding: 18px 12px;
  background-color: ${(p) => (p.selected ? p.theme.POLAR : p.theme.ATHENS_GRAY_DARK)};
  :hover {
    background-color: ${(p) => p.theme.POLAR};
  }
`;

export const EmptySkillName = styled(SkillName)``;

export const SkillDetails = styled.div``;

export const SearchBarContainer = styled.div`
  padding: 0 20px;
`;


export const ActionContainer = styled.div`
  text-align: center;
`;

export const AddSkillButton = styled.button`
  background-color: ${(p) => p.theme.PORT_GORE};
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  padding: 12px 18px;
  margin: 15px auto;
  border-radius: 12px;
`;

export const CustomDropdown = styled.div`
  display: grid;
  grid-template-columns: ${(p) => (p.withThreeColumn ? 'repeat(3, calc(50% - 22px))' : 'repeat(2, calc(50% - 22px))')};
  grid-column-gap: 44px;
  grid-row-gap: 28px;
  max-width: 90%;
`;

export const SelectMemberDropdown = styled.div`
  display: flex;
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
