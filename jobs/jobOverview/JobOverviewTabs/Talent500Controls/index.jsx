import React, {
  useState, useEffect, useMemo, Fragment,
} from 'react';
import format from 'date-fns/format';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { jobOverviewActions } from 'src/web/ats/redux/modules/jobOverview/creator';
import ToggleSwitch, { SWITCHING_DURATION_MS } from 'src/web/ats/components/common/toggleSwitch';
import useCan from 'web/ats/components/common/can/useCan';
import {
  JOBS_TALENT500_TAB_PUBLISH_JOB,
  JOBS_TALENT500_TAB_EDIT_JOB,
  JOB_SYNDICATION_CONTROL,
  SOURCING_MANAGEMENT_ACCESS,
} from 'web/ats/components/common/can/privileges';
import CopyIcon from 'src/web/ats/assets/icons/copy_item_2.svg';
import Modal from 'src/web/ats/components/atoms/modal';
import Input from 'src/web/ats/components/atoms/input';
import { UserPrompt } from 'src/web/ats/components/jobs/jobOverview/common/userPrompt';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import SourcingManagement from 'src/web/ats/components/jobs/common/sourcingManagement';
import toaster, { ERROR } from 'src/web/ats/components/atoms/toaster';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { FACEBOOK_APP_ID } from 'src/config/env';
import DeepScreenConfig from './deepScreen';
import * as S from './styles';
import PartnerConfiguration from './partnerConfiguration';

const Talent500Controls = ({
  jobDetails,
  updateJob,
  isUserGrowthTeamAssociate,
  updateJobSyndicationControl,
  updateJobSyndicationThreshold,
  updateSyndicationPartnerJobAlias,
}) => {
  const statusesForDisablingSyndication = ['on_hold', 'closed', 'cancelled'];

  const REFERRAL_SHARE_TITLE_DM = 'Hello, you! \n\nSigning up on Talent500 has given me access to jobs with leading Fortune 500 companies, and I’d like to share this opportunity with you. Click on the link to apply for this job:\n\n';

  const EMAIL_SHARE_TITLE = 'Opportunity for you!';

  const shouldSyndicationBeDisabled = useMemo(
    () => statusesForDisablingSyndication.includes(jobDetails.syndication_status),
    [jobDetails.syndication_statys],
  );

  const initialMettlConfigData = {
    mettl_assessment_to_be_taken: jobDetails.mettl_assessment_to_be_taken || false,
    mettl_assessment_identifier: jobDetails.mettl_assessment_identifier || '',
  };

  const initialAnonymizationData = {
    needed: jobDetails.anonymization_needed,
    description: jobDetails.anonymized_description,
  };

  const {
    t500_sourcing_control: t500SourcingControl,
    syndication_control: syndicationControl,
    self_screening: selfScreening,
    company,
    title_alias: jobTitleAlias,
    is_job_assigned: isJobAssigned,
    is_user_in_hiring_team: isUserInHiringTeam,
    screening_questions: screeningQuestions,
    job_skills: jobSkills,
    aggregator_sourcing_threshold: aggregatorSourcingThreshold,
    syndication_job_title_alias: syndicationJobTitleAlias,
    sourcers,
  } = jobDetails;

  const [talent500Sourcing, setTalent500Sourcing] = useState(t500SourcingControl);
  const [syndication, setSyndication] = useState(syndicationControl);
  const [talent500SourcingConfirmPrompt, setTalent500SourcingConfirmPrompt] = useState(false);
  const [titleAlias, setTitleAlias] = useState(jobTitleAlias);
  const [sourcingThreshold, setSourcingThreshold] = useState(aggregatorSourcingThreshold);
  const [anonymizationConfig, setAnonymizationConfig] = useState(initialAnonymizationData);
  const [selfScreeningConfig, setSelfScreeningConfig] = useState(selfScreening);
  const [mettlConfigData, setMettlConfigData] = useState(initialMettlConfigData);
  const {
    mettl_assessment_to_be_taken: mettlAssessmentToBeTaken,
    mettl_assessment_identifier: mettlAssessmentIdentifier,
  } = mettlConfigData;
  const [publishJobTooltipMessage, setPublishJobTooltipMessage] = useState('');
  const [removeJobTitleAliasConfirmPrompt, setRemoveJobTitleAliasConfirmPrompt] = useState(false);
  const [addJobTitleAliasModal, setAddJobTitleAliasModal] = useState(false);
  const [jobTitleAliases, setJobTitleAliases] = useState([]);
  const [jobTitleAliasState, setJobTitleAliasState] = useState('');
  const [jobTitleAliasToBeRemoved, setJobTitleAliasToBeRemoved] = useState('');
  const [editSourcingManagement, setEditSourcingManagement] = useState(false);
  const [sourcersData, setSourcersData] = useState(sourcers);


  // Need to take care of behaviour of fail case of turning on T500 sourcing controls
  const handleChangeTalent500Sourcing = () => {
    const updatedTalent500SourcingValue = !talent500Sourcing;
    if (!talent500Sourcing && !selfScreeningConfig) {
      return toaster({
        msg: 'Please turn on self screening to publish the job page',
        type: ERROR,
        unique: true,
      });
    }
    setTalent500Sourcing(updatedTalent500SourcingValue);
    return setTimeout(() => {
      if (!updatedTalent500SourcingValue
        || (updatedTalent500SourcingValue && jobDetails.anonymization_needed)
      ) {
        updateJob({ type: 't500_sourcing_control', t500_sourcing_control: !talent500Sourcing });
      } else {
        setTalent500SourcingConfirmPrompt(!talent500SourcingConfirmPrompt);
      }
    }, SWITCHING_DURATION_MS + 100);
  };

  const handleChangeSyndication = () => {
    const updatedSyndicationValue = !syndication;
    setSyndication(updatedSyndicationValue);
    setTimeout(() => {
      updateJobSyndicationControl(jobDetails.id);
    }, SWITCHING_DURATION_MS + 100);
  };

  const closeTalent500SourcingConfirmPrompt = () => {
    setTalent500Sourcing(false);
    setTalent500SourcingConfirmPrompt(false);
  };

  const handleCopyT500JobUrl = () => {
    navigator.clipboard.writeText(jobDetails.job_url);
    toaster({
      msg: 'Copied to Clipboard',
      type: 'info',
    });
  };

  const toggleSelfScreening = () => {
    const updatedSelfScreenConfig = !selfScreeningConfig;
    setSelfScreeningConfig(updatedSelfScreenConfig);
    setTimeout(() => {
      updateJob({ type: 'self_screening', self_screening: updatedSelfScreenConfig });
    }, SWITCHING_DURATION_MS + 100);
  };

  const updateSourcersValues = (updatedSourcersData) => {
    setSourcersData(updatedSourcersData);
  };

  const submitUpdatedSourcersData = (e) => {
    e.preventDefault();
    updateJob({ type: 'sourcing_management', talent_scout: sourcersData });
    setEditSourcingManagement(!editSourcingManagement);
  };

  const handleSourcingThresholdOnSubmit = (e) => {
    e.preventDefault();
    if (!sourcingThreshold) return;
    setTimeout(() => {
      updateJobSyndicationThreshold({
        jobId: jobDetails.id,
        value: sourcingThreshold,
      });
    }, SWITCHING_DURATION_MS + 100);
  };

  useEffect(() => {
    if (!mettlAssessmentToBeTaken) {
      setMettlConfigData({
        ...mettlConfigData,
        mettl_assessment_identifier: initialMettlConfigData.mettl_assessment_identifier,
      });
    }
  }, [mettlAssessmentToBeTaken]);

  const updateMettlConfigData = (key) => (event) => {
    const booleanTypeKeys = ['mettl_assessment_to_be_taken'];
    const textInputKeys = ['mettl_assessment_identifier'];
    let value;

    if (booleanTypeKeys.includes(key)) {
      value = !mettlConfigData[key];
    } else if (textInputKeys.includes(key)) {
      value = event.target.value;
    }
    setMettlConfigData({ ...mettlConfigData, [key]: value });
  };

  const saveMettlConfig = (event) => {
    event.preventDefault();
    updateJob({ type: 'mettl_config', ...mettlConfigData });
  };

  const saveAnonymizationConfig = (event) => {
    event.preventDefault();
    if (!anonymizationConfig.needed) {
      updateJob({ type: 'anonymization_config', anonymization_needed: false });
    } else {
      updateJob({
        type: 'anonymization_config',
        anonymization_needed: true,
        anonymized_description: anonymizationConfig?.description,
      });
    }
  };

  const saveJobAliasConfig = (event) => {
    event.preventDefault();
    updateJob({ type: 'job_alias', title_alias: titleAlias });
  };

  const handleRemoveJobTitleAlias = () => {
    const filteredAliases = syndicationJobTitleAlias
      .filter((__) => __ !== jobTitleAliasToBeRemoved);
    updateSyndicationPartnerJobAlias({
      jobId: jobDetails.id,
      jobTitleAliases: filteredAliases?.length ? filteredAliases : [],
    });
    setRemoveJobTitleAliasConfirmPrompt(false);
  };

  const handleAddJobTitleAlias = (e) => {
    e.preventDefault();
    if (syndicationJobTitleAlias.includes(jobTitleAliasState)
      || jobTitleAliases.includes(jobTitleAliasState)
      || jobTitleAliases === jobTitleAliasState) {
      toaster({
        msg: `This alias already ${jobTitleAliases.includes(jobTitleAliasState) ? 'added' : 'exists'}`,
        type: 'error',
        unique: true,
      });
      return false;
    }
    setJobTitleAliases([...jobTitleAliases, jobTitleAliasState]);
    setJobTitleAliasState('');

    return true;
  };

  const canPublishJob = useCan(JOBS_TALENT500_TAB_PUBLISH_JOB, { isUserInHiringTeam });
  const canEditJob = useCan(JOBS_TALENT500_TAB_EDIT_JOB, { isJobAssigned, isUserInHiringTeam });
  const canToggleSyndication = useCan(JOB_SYNDICATION_CONTROL);
  const canViewAndModifySourcingManagement = useCan(SOURCING_MANAGEMENT_ACCESS);

  useEffect(() => {
    if (isUserGrowthTeamAssociate) return;
    let message = '';
    if (!jobTitleAlias) message = 'Please enter Job Title Alias to publish the job';
    if (!jobSkills?.length && !talent500Sourcing) message = 'Please add skill(s) to publish the job page';
    if (!screeningQuestions?.length) message = 'Please add screening questionnaire to publish the job page';
    if (!selfScreeningConfig) message = 'Please turn on self screening to publish the job page';
    if (!jobSkills?.length && !screeningQuestions?.length) message = 'Please add skill(s) and screening questionnaire to publish the job page';
    if (screeningQuestions?.length && selfScreeningConfig) {
      if (!canPublishJob) {
        message = 'Please get in touch with the Manager/Sr. Manager/Director assigned to the job to publish the job page';
      }
    }

    setPublishJobTooltipMessage(talent500Sourcing ? '' : message);
  }, [
    screeningQuestions, selfScreeningConfig,
    canPublishJob, isUserGrowthTeamAssociate, jobTitleAlias,
  ]);

  return (<S.Container>
    <S.ConfigureControls>
      <S.ConfigureControlsForm onSubmit={saveJobAliasConfig}>
        <S.ConfigureControlItem border={true} padding={true}>
          <S.ToggleSectionContainer className={'toggle-section'}>
            {!isUserGrowthTeamAssociate ? (
              <S.ToggleSection>
                <S.ConfigureControlItemTitle>Publish Job Page</S.ConfigureControlItemTitle>
                <Tooltip
                  title={publishJobTooltipMessage}
                  position='top'
                  size='small'
                  disabled={!publishJobTooltipMessage}
                >
                  <ToggleSwitch
                    size={'medium'}
                    checked={talent500Sourcing}
                    onChange={handleChangeTalent500Sourcing}
                    disabled={!(
                      canPublishJob
                      && (jobSkills?.length || talent500Sourcing)
                      && jobTitleAlias
                    )}
                  />
                </Tooltip>
              </S.ToggleSection>
            ) : null}
            {canToggleSyndication && isUserGrowthTeamAssociate ? (
              <S.ToggleSection>
                <S.ConfigureControlItemTitle>
                  Syndicate with job boards
                </S.ConfigureControlItemTitle>
                <ToggleSwitch
                  size={'medium'}
                  checked={syndication}
                  disabled={shouldSyndicationBeDisabled}
                  onChange={handleChangeSyndication}
                />
              </S.ToggleSection>
            ) : null}
            {talent500Sourcing && jobDetails.published_by_user && jobDetails.published_at
              ? (<S.PublishedDetails>Published by {jobDetails.published_by_user} on {
                format(new Date(jobDetails.published_at), 'do LLL yyyy')
              }</S.PublishedDetails>) : null}
          </S.ToggleSectionContainer>

          {jobDetails.t500_sourcing_control && jobDetails.job_url
            ? <S.CopyT500JobUrl onClick={handleCopyT500JobUrl}>
              <S.T500JobUrlText>{jobDetails.job_url}</S.T500JobUrlText>
              <S.JobUrlCopyIcon src={CopyIcon} />
            </S.CopyT500JobUrl> : null}
          {(jobDetails.job_url && talent500Sourcing) && (
            <S.ReferShareVia>
              <div>Share via: </div>
              <div>
                <LinkedinShareButton
                  title={REFERRAL_SHARE_TITLE_DM}
                  url={jobDetails.job_url}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <FacebookShareButton
                  quote={REFERRAL_SHARE_TITLE_DM}
                  url={jobDetails.job_url}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton
                  title={REFERRAL_SHARE_TITLE_DM}
                  separator={' '}
                  url={jobDetails.job_url}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <FacebookMessengerShareButton
                  appId={FACEBOOK_APP_ID}
                  url={jobDetails.job_url}
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
                <TwitterShareButton
                  title={REFERRAL_SHARE_TITLE_DM}
                  url={jobDetails.job_url}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <EmailShareButton
                  subject={EMAIL_SHARE_TITLE}
                  body={REFERRAL_SHARE_TITLE_DM}
                  url={jobDetails.job_url}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
            </S.ReferShareVia>
          )}
          <PartnerConfiguration
            display={isUserGrowthTeamAssociate} />
          <S.SectionBoxContainer>
            <S.SectionBoxItem>
              {isUserGrowthTeamAssociate ? (
                <Fragment>
                  <S.SectionBoxItemTitle>
                    <div>Job Title Alias</div>
                    <S.AddJobTitleAlias onClick={() => setAddJobTitleAliasModal(true)}>
                      + Add Job Alias
                    </S.AddJobTitleAlias>
                  </S.SectionBoxItemTitle>

                  <S.JobTitleAliases>
                    <S.JobTitleAliasFixed>{jobTitleAlias}</S.JobTitleAliasFixed>

                    {syndicationJobTitleAlias?.length ? (
                      <>
                        &nbsp;|&nbsp;
                        {syndicationJobTitleAlias.map((alias, index) => (
                          <S.JobTitleAlias key={index}>
                            <div>{alias}</div>
                            <S.JobTitleAliasRemove
                              onClick={() => {
                                setJobTitleAliasToBeRemoved(alias);
                                setRemoveJobTitleAliasConfirmPrompt(true);
                              }}
                            >&times;</S.JobTitleAliasRemove>
                          </S.JobTitleAlias>
                        ))}
                      </>
                    ) : null}
                  </S.JobTitleAliases>
                </Fragment>
              ) : (
                <Fragment>
                  <S.SectionBoxItemTitle>
                    Job Title Alias
                  </S.SectionBoxItemTitle>
                  <Input
                    type='text'
                    placeholder={'Job Title Alias'}
                    min={0}
                    step={1}
                    fontSize={12}
                    value={titleAlias || ''}
                    onChange={(e) => setTitleAlias(e.target.value)}
                    readOnly={!canPublishJob}
                  />
                  <br />

                  {!(jobTitleAlias === titleAlias) && (
                    <S.SaveConfigurationContainer>
                      <S.SaveConfiguration
                        type="submit"
                        value={'Save'}
                        disabled={!canPublishJob}
                      />
                    </S.SaveConfigurationContainer>
                  )}
                </Fragment>
              )}
            </S.SectionBoxItem>
            {isUserGrowthTeamAssociate ? (
              (
                <form>
                  <S.SectionBoxItem>
                    <S.SectionBoxItemTitle>
                      Aggregator Sourcing Threshold
                    </S.SectionBoxItemTitle>
                    <Input
                      type='number'
                      placeholder={'eg: 200'}
                      fontSize={12}
                      value={sourcingThreshold || ''}
                      onChange={(e) => setSourcingThreshold(e.target.value)}
                    />
                  </S.SectionBoxItem>
                  {(parseInt(sourcingThreshold, 10) !== aggregatorSourcingThreshold)
                    && sourcingThreshold && (
                      <S.SaveSourcingThresholdContainer>
                        <S.SaveSourcingThresholdButton onClick={handleSourcingThresholdOnSubmit}>
                          Save
                        </S.SaveSourcingThresholdButton>
                      </S.SaveSourcingThresholdContainer>
                  )}
                </form>
              )
            ) : null}
          </S.SectionBoxContainer>
        </S.ConfigureControlItem>
      </S.ConfigureControlsForm>
      {canViewAndModifySourcingManagement
        ? <S.ConfigureControlsForm onSubmit={submitUpdatedSourcersData}>
          <S.UpdateSourcingManagementContainer>
            <S.SourcingManagementTitleAndAction>
              <S.ConfigureControlItemTitle>Sourcing Management</S.ConfigureControlItemTitle>
              {editSourcingManagement
                ? <S.SourcingManagementAction
                  key={'save'}
                  type={'submit'}
                >Save</S.SourcingManagementAction>
                : <S.SourcingManagementAction
                  key={'edit'}
                  type={'button'}
                  onClick={() => setEditSourcingManagement(!editSourcingManagement)}
                >Edit</S.SourcingManagementAction>
              }
            </S.SourcingManagementTitleAndAction>
            <SourcingManagement
              initialSourcersData={sourcers}
              updateSourcersValues={updateSourcersValues}
              readOnly={!editSourcingManagement}
            />
          </S.UpdateSourcingManagementContainer>
        </S.ConfigureControlsForm> : null}
      <S.ConfigureControlsForm onSubmit={saveAnonymizationConfig}>
        <S.ConfigureControlItem border={true} padding={true}>
          <div>
            <S.ConfigureControlItemTitle>Job Anonymization</S.ConfigureControlItemTitle>
            <ToggleSwitch
              size={'medium'}
              checked={anonymizationConfig.needed}
              onChange={() => setAnonymizationConfig({
                ...anonymizationConfig, needed: !anonymizationConfig.needed,
              })}
              disabled={!canEditJob}
            />
          </div>
          {!!anonymizationConfig.needed && <S.JobAnonymization>
            <S.SectionBoxItem>
              <S.SectionBoxItemTitle>
                Anonymized Company Alias
              </S.SectionBoxItemTitle>
              <Input
                type='text'
                placeholder={'Anonymized Company Alias'}
                min={0}
                step={1}
                fontSize={12}
                value={company.company_alias || ''}
                readOnly={true}
              />
            </S.SectionBoxItem>
            <S.SectionBoxItem>
              <S.SectionBoxItemTitle>
                Anonymized Job Description
              </S.SectionBoxItemTitle>
              <S.TextArea
                rows={4}
                cols={8}
                onChange={(e) => setAnonymizationConfig({
                  ...anonymizationConfig, description: e.target.value,
                })}
                disabled={!canEditJob}
                value={anonymizationConfig.description || ''}
                placeholder={'Enter or Paste Anonymized Job Description'}
              />
            </S.SectionBoxItem>
          </S.JobAnonymization>}
          {!isEqual(initialAnonymizationData, anonymizationConfig) && <S.SaveConfiguration
            disabled={!canEditJob}
            type="submit"
            value={'Save'}
          />}
        </S.ConfigureControlItem>
      </S.ConfigureControlsForm>
      <S.ConfigureControlItem border={true} padding={true}>
        <div>
          <S.ConfigureControlItemTitle>DeepScreen Configuration</S.ConfigureControlItemTitle>
          <ToggleSwitch
            size={'medium'}
            checked={selfScreeningConfig}
            onChange={toggleSelfScreening}
            disabled={!canEditJob}
          />
        </div>
        {jobDetails.self_screening && <DeepScreenConfig
          deepScreeningQuestions={jobDetails.screening_questions}
          updateJob={updateJob}
          disabled={!canEditJob}
        />}
      </S.ConfigureControlItem>
      <S.ConfigureControlsForm onSubmit={saveMettlConfig}>
        <S.ConfigureControlItem border={true} padding={true}>
          <div>
            <S.ConfigureControlItemTitle>Mettl Assessment</S.ConfigureControlItemTitle>
            <ToggleSwitch
              size={'medium'}
              checked={mettlAssessmentToBeTaken}
              onChange={updateMettlConfigData('mettl_assessment_to_be_taken')}
              disabled={!canEditJob}
            />
          </div>
          {mettlAssessmentToBeTaken && <S.ConfigureControlInput
            placeholder={'Your Mettl Assessment Id'}
            onChange={updateMettlConfigData('mettl_assessment_identifier')}
            value={mettlAssessmentIdentifier}
            required={true}
            readOnly={!canEditJob}
          />}
          {!isEqual(initialMettlConfigData, mettlConfigData) && <S.SaveConfiguration
            type="submit"
            value={'Save'}
            disabled={!canEditJob}
          />}
        </S.ConfigureControlItem>
      </S.ConfigureControlsForm>
    </S.ConfigureControls>

    {talent500SourcingConfirmPrompt && <Modal
      showModal={talent500SourcingConfirmPrompt}
      backgroundBlur={true}
      toggleModal={closeTalent500SourcingConfirmPrompt}
    >
      <UserPrompt
        title={'Confirmation'}
        note={'Are you sure you want to turn on Talent500 sourcing without anonymising the job?'}
        primaryAction={(event) => {
          event.preventDefault();
          updateJob({ type: 't500_sourcing_control', t500_sourcing_control: true });
          setTalent500SourcingConfirmPrompt(false);
        }}
        secondaryAction={closeTalent500SourcingConfirmPrompt}
      />
    </Modal>}

    {removeJobTitleAliasConfirmPrompt && <Modal
      showModal={removeJobTitleAliasConfirmPrompt}
      backgroundBlur={true}
      toggleModal={() => setRemoveJobTitleAliasConfirmPrompt(!removeJobTitleAliasConfirmPrompt)}
    >
      <UserPrompt
        title={'Remove Job Title Alias'}
        note={'Are you sure you want to remove this Job Title Alias?'}
        primaryAction={(event) => {
          event.preventDefault();
          handleRemoveJobTitleAlias();
        }}
        secondaryAction={() => setRemoveJobTitleAliasConfirmPrompt(false)}
      />
    </Modal>}

    {addJobTitleAliasModal && <Modal
      showModal={addJobTitleAliasModal}
      backgroundBlur={true}
      toggleModal={() => setAddJobTitleAliasModal(!addJobTitleAliasModal)}
    >
      <S.AddJobTitleAliasModal>
        <S.AddJobTitleAliasTitle>Add Job Alias(s)</S.AddJobTitleAliasTitle>
        <S.AddJobTitleAliasInputSection onSubmit={handleAddJobTitleAlias}>
          <S.AddJobTitleAliasInput
            placeholder={'eg. Lead Java Developer'}
            value={jobTitleAliasState}
            onChange={(e) => setJobTitleAliasState((e.target.value).trimStart())}
          />
          <S.AddJobTitleAliasAddButton
            type='submit'
            disabled={!jobTitleAliasState}
          >+ Add</S.AddJobTitleAliasAddButton>
        </S.AddJobTitleAliasInputSection>

        {jobTitleAliases?.length ? (
          <S.AllJobTitleAliases>
            {jobTitleAliases.map((alias, index) => (
              <S.AllJobTitleAlias key={index}>
                <div>{alias}</div>
                <S.AllJobTitleAliasRemove
                  onClick={() => setJobTitleAliases(jobTitleAliases.filter((__) => __ !== alias))}
                >&times;</S.AllJobTitleAliasRemove>
              </S.AllJobTitleAlias>
            ))}
          </S.AllJobTitleAliases>
        ) : null}

        <S.AddJobTitleAliasActions>
          <S.PrimaryAction
            disabled={!jobTitleAliases?.length}
            onClick={(e) => {
              e.preventDefault();
              updateSyndicationPartnerJobAlias({
                jobId: jobDetails.id,
                jobTitleAliases: [...syndicationJobTitleAlias, ...jobTitleAliases],
              });
              setAddJobTitleAliasModal(false);
              setJobTitleAliases([]);
            }}
          >Confirm</S.PrimaryAction>
          <S.SecondaryAction onClick={() => {
            setAddJobTitleAliasModal(false);
            setJobTitleAliases([]);
          }}>Go Back</S.SecondaryAction>
        </S.AddJobTitleAliasActions>
      </S.AddJobTitleAliasModal>
    </Modal>}
  </S.Container>);
};

Talent500Controls.propTypes = {
  jobDetails: PropTypes.object,
  updateJob: PropTypes.func,
  isUserGrowthTeamAssociate: PropTypes.bool,
  updateJobSyndicationControl: PropTypes.func,
  updateJobSyndicationThreshold: PropTypes.func,
  updateSyndicationPartnerJobAlias: PropTypes.func,
};

const mapStateToProps = ({ session }) => ({
  modalCount: sessionSelectors.modalCount({ session }),
  isUserGrowthTeamAssociate: sessionSelectors.isUserGrowthTeamAssociate({ session }),
});


const mapDispatchToProps = {
  updateJob: jobOverviewActions.updateJob,
  updateJobSyndicationControl: jobOverviewActions.updateJobSyndicationControl,
  updateJobSyndicationThreshold: jobOverviewActions.updateJobSyndicationThreshold,
  updateSyndicationPartnerJobAlias: jobOverviewActions.updateSyndicationPartnerJobAlias,
};

export default connect(mapStateToProps, mapDispatchToProps)(Talent500Controls);
