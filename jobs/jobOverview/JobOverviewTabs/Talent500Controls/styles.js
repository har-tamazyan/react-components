import styled, { css } from 'styled-components';
import Input from 'src/web/ats/components/atoms/input';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.div``;

export const ConfigureControls = styled.div`
  width: 100%;
  max-width: 540px;
  margin-top: 30px;
`;

export const ConfigureControlsForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ToggleSectionContainer = styled.div``;

export const ToggleSection = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ConfigureControlItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 30px;
  ${(p) => p.border && css`
    border: 1px dashed ${p.theme.RHINO};
    border-radius: 4px;
  `}
  ${(p) => p.padding && css`padding: 20px;`}
  & > div:first-child:not(.toggle-section) {
    display: flex;
    justify-content: space-between;
  }
  & > div:nth-child(2):not(.toggle-section) {
    margin-top: 35px;
  }
`;

export const ConfigureControlItemTitle = styled.h5`
${(p) => ({
    large: css`
        color: ${p.theme.PORT_GORE};
        font-size: ${p.theme.XXX_LARGE};
        font-weight: ${p.theme.SEMI_BOLD_FONT};
            `,
    small: css`
        color: ${p.theme.SCORPION};
        font-size: ${p.theme.MEDIUM};
        font-weight: ${p.theme.BOLD_FONT};
            `,
  }[p.size || 'small'])}  
`;

export const CopyT500JobUrl = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  margin: 15px 0 40px;
  border: 1px solid ${(p) => p.theme.RHINO};
  border-radius: 9px;
  cursor: pointer;
`;

export const T500JobUrlText = styled.div`
  width: 100%;
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 8px 0;
  padding: 0 4px 0 9px;
  border-right: 0.5px solid ${(p) => p.theme.SILVER};
`;

export const JobUrlCopyIcon = styled.img`
  max-width: 16px;
  margin: 4px 9px;
`;

export const NoJobUrlPlaceholder = styled.div`
  margin: 30px 0 40px;
`;

export const ConfigureControlInput = styled(Input)`
  margin-top: 12px;
  input {
    &:focus{
      color: ${(p) => p.theme.RHINO};
      font-weight: ${(p) => p.theme.BOLD_FONT};
    }
    color: ${(p) => p.theme.RHINO};
    font-weight: ${(p) => p.theme.BOLD_FONT};
    &::placeholder {
      color: ${(p) => p.theme.SILVER};
      font-weight: ${(p) => p.theme.REGULAR_FONT};
    }
  }
`;

export const SaveConfiguration = styled.input`
  align-self: flex-end;
  border: 0;
  border-radius: 8px;
  height: 36px;
  width: 100px;
  font-size: ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;
  &:hover {
    opacity: 0.95;
  }
`;

export const UpdateSourcingManagementContainer = styled.div`
  margin: 10px 0 30px;
  border: 1px dashed ${(p) => p.theme.RHINO};
  border-radius: 4px;
  padding: 20px;
  .sourcer_input_wrapper {
    & > div {
      width: 228px;
    }
  }
  .sourcer_input_add_remove_icon {
    margin-left: 6px;
  }
`;

export const SourcingManagementTitleAndAction = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const SourcingManagementAction = styled.button`
  color: ${(p) => p.theme.HAVELOCK_BLUE};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const SaveSourcingThresholdButton = styled.button`
  align-self: flex-end;
  border: 0;
  border-radius: 8px;
  height: 36px;
  width: 100px;
  font-size: ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;
  &:hover {
    opacity: 0.95;
  }
`;

export const SaveSourcingThresholdContainer = styled.div`
  margin-top: 10px;
  text-align: right;
`;

export const SaveConfigurationContainer = styled.div`
  text-align: right;
`;

export const SectionBoxItem = styled.div`
  margin-top: 24px;
`;

export const JobAnonymizationInOptions = styled.div`
  display: flex;
  padding: 0 10px;
`;

export const JobAnonymizationInOption = styled.div`
  display: flex;
  div {
    margin-left: 5px;
    max-width: 120px;
    overflow:wrap;
  }
`;

export const JobAnonymization = styled.div`
  border-radius: 12px;
  & > div:first-child {
    margin: 0;
  }
`;

export const SectionBoxItemTitle = styled.div`
  margin-bottom: 8px;
  ${FLEX('center', 'space-between')};
  color: ${(p) => p.theme.PORT_GORE};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};

  ${(p) => p.theme.XL_DESKTOP`
    margin-bottom: 6px;
  `}
`;

export const TextArea = styled.textarea`
  padding: 16px;
  border: 1px solid ${(p) => p.theme.ALTO};
  width: 100%;
  resize: none;
  border-radius: 4px;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  color: ${(p) => p.theme.WATERLOO};

  &:focus {
    outline: 0;
    color: ${(p) => p.theme.SHARK};
  }

  &::placeholder {
    color: ${(p) => p.theme.SILVER};
  }
  `;

export const SectionBoxContainer = styled(JobAnonymization)`
  padding: 28px 48px 32px 24px;
  border: 1px solid #323462;
  border-radius: 4px;
  margin-top: 35px;
`;

export const PublishedDetails = styled.p`
  color: ${(p) => p.theme.SCORPION};
  text-align: left;
  margin-top: 5px;
  font-size: ${(p) => p.theme.X_SMALL};
`;

export const AddJobTitleAlias = styled.div`
  cursor: pointer;
  color: ${(p) => p.theme.HAVELOCK_BLUE};
  font-size: ${(p) => p.theme.SMALL};
  user-select: none;
`;

export const JobTitleAliases = styled.div`
  ${FLEX('center')};
  flex-wrap: wrap;
  padding: 8px;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  border: 1px solid ${(p) => p.theme.ALTO};
  border-radius: 4px;
  min-height: 44px;
  color: ${(p) => p.theme.ALTO};
`;

export const JobTitleAlias = styled.div`
  position: relative;
  margin: 4px;
  ${FLEX('center')};
  padding: 4px 32px 4px 16px;
  border-radius: 20px;
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.PORT_GORE};
`;

export const JobTitleAliasFixed = styled(JobTitleAlias)`
  padding: 4px 16px;
`;

export const JobTitleAliasRemove = styled.div`
  position: absolute;
  top: 4px;
  right: 6px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  text-align: center;
`;

export const AddJobTitleAliasModal = styled.div`
  padding: 24px;
  min-height: 240px;
  width: 500px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 8px;
`;

export const AddJobTitleAliasTitle = styled.div`
  color: ${(p) => p.theme.MINE_SHAFT};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const AddJobTitleAliasInputSection = styled.form`
  margin-top: 24px;
  position: relative;
`;

export const AddJobTitleAliasInput = styled.input`
  width: 100%;
  padding: 8px;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  border: 1px solid ${(p) => p.theme.ALTO};
  border-radius: 4px;
  min-height: 44px;
`;

export const AddJobTitleAliasAddButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  user-select: none;
  color: ${(p) => p.theme.HAVELOCK_BLUE};
  font-size: ${(p) => p.theme.SMALL};
  cursor: pointer;
`;

export const AllJobTitleAliases = styled.div`
  margin-top: 36px;
  padding: 8px;
  ${FLEX('center')};
  flex-wrap: wrap;
  border: 1px dashed ${(p) => p.theme.PORT_GORE};
  border-radius: 4px;
`;

export const AllJobTitleAlias = styled(JobTitleAlias)``;
export const AllJobTitleAliasRemove = styled(JobTitleAliasRemove)``;

export const AddJobTitleAliasActions = styled.div`
  margin-top: 72px;
  ${FLEX('center', 'center')};
`;

export const PrimaryAction = styled.button`
  border: 1px solid ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WATERLOO};
  width: 120px;
  padding: 8px;
  ${FLEX('center', 'center')};
  color: ${(p) => p.theme.WHITE};
  border-radius: 4px;
`;

export const SecondaryAction = styled(PrimaryAction)`
  margin-left: 12px;
  color: ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WHITE};
`;

export const ReferShareVia = styled.div`
  font-size: 12px;
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SCORPION};
  text-transform: uppercase;
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(2) {
      margin-left: 12px;
    }

    > button {
      &:focus {
        outline: 0;
      }

      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }

  ${(p) => p.theme.PHONE`
    flex-direction: column;
    align-items: flex-start;

    > div {
      &:nth-child(2) {
        padding-top: 8px;
        margin-left: unset;
      }
    }
  `}
`;
