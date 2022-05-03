import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { SOURCING_DRAFT, CANCELLED, CLOSED } from 'src/constants/jobs';
import useCan from 'web/ats/components/common/can/useCan';
import { JOBS_OVERVIEW_OVERVIEW_TAB, JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB, JOBS_OVERVIEW_T500_TAB } from 'web/ats/components/common/can/privileges';
import { STATUS } from 'src/web/ats/components/jobs/common/constants';
import * as S from './styles';
import Overview from './Overview';
import ProcessAndWorkflow from './ProcessAndWorkflow';
import Talent500Controls from './Talent500Controls';
import InCallDetailsTab from './IntakeCallDetails';



const mapTabNameToComponent = {
  Overview,
  'Process & Workflow': ProcessAndWorkflow,
  'Talent500 Controls': Talent500Controls,
  'Intake Call Details': InCallDetailsTab,
};

const JobOverviewTabs = ({
  jobDetails,
  gotoEditJobForm,
  userRole,
}) => {
  const TAB_ITEMS = {
    overview: {
      id: 'overview',
      name: 'Overview',
      privileges: JOBS_OVERVIEW_OVERVIEW_TAB,
    },
    ...(jobDetails.intake_call_detail && ({
      intake_call_details: {
        id: 'intake_call_details',
        name: 'Intake Call Details',
        privileges: JOBS_OVERVIEW_T500_TAB,
      },
    })),
    process_and_workflow: {
      id: 'process_workflow',
      name: 'Process & Workflow',
      privileges: JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB,
    },
    talent500_controls: {
      id: 't500',
      name: 'Talent500 Controls',
      privileges: JOBS_OVERVIEW_T500_TAB,
    },
  };

  if (!Object.keys(jobDetails).length) return null;

  const { status } = jobDetails;

  const isOverviewTabVisible = useCan(JOBS_OVERVIEW_OVERVIEW_TAB,
    {
      status, SOURCING_DRAFT, CANCELLED, CLOSED,
    });
  const isProcessWorkflowTabVisible = useCan(JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB, {
    status, SOURCING_DRAFT, CANCELLED, CLOSED,
  });
  const isT500TabVisible = useCan(JOBS_OVERVIEW_T500_TAB, {
    status, SOURCING_DRAFT, CANCELLED, CLOSED,
  });

  const tabs = useMemo(() => {
    let tabItems = Object.keys(TAB_ITEMS).map((item) => TAB_ITEMS[item]);
    if (!isOverviewTabVisible) {
      tabItems = tabItems.filter((item) => item.id !== 'overview');
    }
    if (!isProcessWorkflowTabVisible) {
      tabItems = tabItems.filter((item) => item.id !== 'process_workflow');
    }
    if (!isT500TabVisible) {
      tabItems = tabItems.filter((item) => item.id !== 't500');
    }
    return tabItems;
  }, [isOverviewTabVisible, isProcessWorkflowTabVisible, isT500TabVisible]);

  if (!tabs) {
    return null;
  }

  const [functionalTabs, setFunctionalTabs] = useState([]);
  const [isActiveTabItem, setIsActiveTabItem] = useState(TAB_ITEMS.overview.name);


  useEffect(() => {
    setFunctionalTabs(tabs);
  }, [tabs]);

  useEffect(() => {
    setFunctionalTabs(tabs);
    if (
      !tabs.find((tabItem) => tabItem.name === isActiveTabItem)
    ) setIsActiveTabItem(TAB_ITEMS.overview.name);
  }, [jobDetails, tabs]);

  const ActiveTabItem = mapTabNameToComponent[isActiveTabItem];

  return (
    <S.Container>
      <S.TabContainer>
        <S.Tab>
          {functionalTabs.map((tabItem) => (
            <S.TabItem
              disabled={['process_workflow', 't500'].includes(tabItem.id) && jobDetails.status !== STATUS.OPEN}
              key={tabItem.id}
              onClick={() => setIsActiveTabItem(tabItem.name)}
              isActiveTabItem={tabItem.name === isActiveTabItem}
            >
              {tabItem.name}
            </S.TabItem>
          ))}
        </S.Tab>
      </S.TabContainer>
      <S.TabItemContainer>
        <ActiveTabItem
          jobDetails={jobDetails}
          gotoEditJobForm={gotoEditJobForm}
          userRole={userRole}
        />
      </S.TabItemContainer>
    </S.Container>
  );
};

JobOverviewTabs.propTypes = {
  jobDetails: PropTypes.object,
  gotoEditJobForm: PropTypes.func,
  userRole: PropTypes.string,
};

export default JobOverviewTabs;
