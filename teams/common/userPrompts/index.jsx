/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { mapRolesToConstants, VENDOR_AGENCY } from 'src/config/definitions';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from './styles';


export const RemoveTeamMemberPrompt = ({
  data,
  fetchAssigneesOptions,
  assigneeOptions = [],
  primaryAction,
  secondaryAction,
}) => {
  const { role, role_display: roleDisplayName } = data;
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const assigneeOptionLabelValueMap = assigneeOptions.map((_) => (
    { label: `${_.name} | ${_.role_display} | ${_.email}`, value: _.id }
  ));

  const {
    DIRECTOR,
    ADMIN,
    SENIOR_MANAGER,
    MANAGER,
    RECRUITER,
    TALENT_SCOUT,
    VENDOR,
    VENDOR_RPO,
    COORDINATOR,
    INTERVIEWER,
    HIRING_MANAGER,
    AUDITOR,
    HR_OPERATIONS_ASSOCIATE,
    PCP_ASSOCIATE,
    JOB_PAGE_REVIEWER,
    GROWTH_TEAM_ASSOCIATE,
    SOURCING_MANAGER,
    CATEGORY,
  } = mapRolesToConstants;

  const promptTypeConfig = {
    [ADMIN]: {
      note: 'You need to assign all active jobs/stages tagged to this recruiter to another recruiter. Please select a recruiter to assign all active jobs/stages.',
      assigneeInputPlaceholder: 'Select Recruiter',
      requireAssignee: true,
      mandatoryAssignee: true,
      footerNote: 'All active interview invites associated with this Recruiter will be cancelled. Please confirm to proceed.',
    },
    [DIRECTOR]: {
      note: 'You need to assign all active jobs/stages tagged to this recruiter to another recruiter. Please select a recruiter to assign all active jobs/stages.',
      assigneeInputPlaceholder: 'Select Recruiter',
      requireAssignee: true,
      mandatoryAssignee: true,
      footerNote: 'All active interview invites associated with this Recruiter will be cancelled. Please confirm to proceed.',
    },
    [SENIOR_MANAGER]: {
      note: 'You need to assign all active jobs/stages tagged to this recruiter to another recruiter. Please select a recruiter to assign all active jobs/stages.',
      assigneeInputPlaceholder: 'Select Recruiter',
      requireAssignee: true,
      mandatoryAssignee: true,
      footerNote: 'All active interview invites associated with this Recruiter will be cancelled. Please confirm to proceed.',
    },
    [MANAGER]: {
      note: 'You need to assign all active jobs/stages tagged to this recruiter to another recruiter. Please select a recruiter to assign all active jobs/stages.',
      assigneeInputPlaceholder: 'Select Recruiter',
      requireAssignee: true,
      mandatoryAssignee: true,
      footerNote: 'All active interview invites associated with this Recruiter will be cancelled. Please confirm to proceed.',
    },
    [RECRUITER]: {
      note: 'You need to assign all active jobs/stages tagged to this recruiter to another recruiter. Please select a recruiter to assign all active jobs/stages.',
      assigneeInputPlaceholder: 'Select Recruiter',
      requireAssignee: true,
      mandatoryAssignee: true,
      footerNote: 'All active interview invites associated with this Recruiter will be cancelled. Please confirm to proceed.',
    },
    [TALENT_SCOUT]: {
      note: 'Are you sure you want to remove this Talent Scout?',
      requireAssignee: false,
    },
    [COORDINATOR]: {
      note: 'Are you sure you want to remove this Coordinator?',
      requireAssignee: false,
    },
    [VENDOR]: {
      note: 'Are you sure you want to remove this Vendor?',
      requireAssignee: false,
    },
    [VENDOR_AGENCY]: {
      note: 'Are you sure you want to delete this Vendor Agency? All vendor personnel tagged to this agency will be removed from Canvas.',
      requireAssignee: false,
    },
    [VENDOR_RPO]: {
      note: 'You need to assign all active jobs/stages tagged to this Vendor RPO to another recruiter. Please select a recruiter to assign all active jobs/stages.',
      assigneeInputPlaceholder: 'Select Recruiter',
      requireAssignee: true,
      mandatoryAssignee: true,
      footerNote: 'All active interview invites associated with this Vendor RPO will be cancelled. Please confirm to proceed.',
    },
    [HIRING_MANAGER]: {
      note: 'You need to assign all active jobs/stages tagged to this Hiring Manager to another Hiring Manager. Please select a Hiring Manager to assign all active jobs/stages.',
      assigneeInputPlaceholder: 'Select Hiring Manager',
      requireAssignee: true,
      mandatoryAssignee: true,
      footerNote: 'All active interview invites associated with this Hiring Manager will be cancelled. Please confirm to proceed.',
    },
    [INTERVIEWER]: {
      note: 'You may assign all active jobs/stages tagged to this Interviewer to another Interviewer. Please select a Interviewer to assign all active jobs/stages. Leave blank and click “Confirm” to skip.',
      assigneeInputPlaceholder: 'Select HM/Interviewer (Optional)',
      requireAssignee: true,
      mandatoryAssignee: false,
      footerNote: 'All active interview invites associated with this Interviewer will be cancelled. Please confirm to proceed.',
    },
    [AUDITOR]: {
      note: 'Are you sure you want to remove this Auditor?',
      requireAssignee: false,
    },
    [HR_OPERATIONS_ASSOCIATE]: {
      note: 'You need to assign all active jobs/stages tagged to this HR Operations Associate to another HR Operations Associate. Please select a HR Operations Associate to assign all active jobs/stages.',
      requireAssignee: true,
      assigneeInputPlaceholder: 'Select HR Operations Associate',
      mandatoryAssignee: true,
    },
    [PCP_ASSOCIATE]: {
      note: 'Are you sure you want to remove this PCP Associate?',
      requireAssignee: false,
    },
    [JOB_PAGE_REVIEWER]: {
      note: 'Are you sure you want to remove this Job Page Reviewer?',
      requireAssignee: false,
    },
    [GROWTH_TEAM_ASSOCIATE]: {
      note: 'Are you sure you want to remove this Growth Team Associate?',
      requireAssignee: false,
    },
    [SOURCING_MANAGER]: {
      note: 'Are you sure you want to remove this Sourcing Manager?',
      requireAssignee: false,
    },
    [CATEGORY]: {
      note: 'Are you sure you want to delete this category?',
      requireAssignee: false,
    },
  };

  useEffect(() => {
    if (fetchAssigneesOptions) fetchAssigneesOptions();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    primaryAction(selectedMemberId);
  };

  const {
    note, requireAssignee,
    assigneeInputPlaceholder,
    mandatoryAssignee, footerNote,
  } = promptTypeConfig[role];

  return (
    <S.PromptContainer onSubmit={onSubmit}>
      <S.PromptTitle>{`Remove ${roleDisplayName}`}</S.PromptTitle>
      <S.PromptNote>{note}</S.PromptNote>
      <S.RemoveTeamMemberPromptContentWrapper>
        {requireAssignee && <DropDown
          options={assigneeOptionLabelValueMap}
          placeholder={assigneeInputPlaceholder}
          required={mandatoryAssignee}
          onOptionSelect={(_, __) => setSelectedMemberId(__.value)}
          selected={assigneeOptionLabelValueMap.find((_) => _.value === selectedMemberId)}
          />}
      </S.RemoveTeamMemberPromptContentWrapper>
      {footerNote && <S.FooterPromptNote>{footerNote}</S.FooterPromptNote>}
      <S.PromptButtons>
        <S.PromptPrimaryButton type='submit'>Confirm</S.PromptPrimaryButton>
        <S.PromptSecondaryButton onClick={secondaryAction}>Go back</S.PromptSecondaryButton>
      </S.PromptButtons>
    </S.PromptContainer>
  );
};

RemoveTeamMemberPrompt.propTypes = {
  data: PropTypes.object,
  fetchAssigneesOptions: PropTypes.func,
  assigneeOptions: PropTypes.array,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
};
