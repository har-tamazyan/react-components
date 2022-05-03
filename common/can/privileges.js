import {
  mapRolesToConstants, mapRolesToUserGroup,
  VENDOR_AGENCY,
} from 'src/config/definitions';

export const LANDING_PAGE = 'pages/landing_page';
export const DASHBOARD = 'pages/dashboard';
export const CANDIDATE = 'pages/candidate';
export const JOB = 'pages/job';
export const SETTINGS = 'pages/settings';
export const TEAMS = 'pages/teams';
export const CONFIGURATION = 'pages/configuration';
export const SYNDICATION_PARTNERS = 'pages/syndication_partners';
export const ANALYTICS = 'pages/analytics';
export const VIEW_ANALYTICS_JOB_STATUS = 'pages/analytics/jobStatus';
export const VIEW_ANALYTICS_SCORECARD = 'pages/analytics/details/scoreCard';
export const VIEW_ANALYTICS_TRENDLINE = 'pages/analytics/details/trendline';
export const VIEW_ANALYTICS_REPORT = 'pages/analytics/details/report';
export const ADD_SYNDICATION_PARTNER = 'syndication_partners/add_partner';
export const LIVE_CV = 'pages/live_cv';
export const ADD_CANDIDATE = 'pages/add_candidates';
export const ADD_JOBS = 'pages/add_jobs';
export const EDIT_JOBS = 'pages/edit_jobs';
export const CANDIDATE_ACTION_PALETTE = 'candidate/action_palette';
export const CANDIDATE_COMPLETE_HISTORY = 'candidate/history/view_complete_history';
export const CANDIDATE_PRE_CANVAS_APPLICANTS = 'candidate/table/pre_canvas_applicants';
export const CANDIDATE_TABLE_ACTION_COLUMN = 'candidate/table/action_column';
export const CANDIDATE_TABLE_CHECKBOX = 'candidate/table/checkbox';
export const CANDIDATE_PROFILE_EDIT = 'candidate/overview/profile_edit';
export const CANDIDATE_OFFER_DETAILS_EDIT = 'candidate/overview/offer_details_edit';
export const CANDIDATE_PROFILE_EDIT_SOURCE = 'candidate/overview/profile_edit_source';
export const JOBS_OVERVIEW_ASSIGNE = 'jobs/overview/assigne';
export const JOBS_OVERVIEW_REVIEW = 'jobs/overview/review';
export const JOB_SUBMIT_REVIEW = 'jobs/submit/review';
export const TEAMS_ADD_TEAM_MEMBERS = 'teams/add_team_member';
export const TEAMS_DISPLAY_ADD_RECRUITER_BUTTON = 'teams/display_add_recruiter_button';
export const CONFIGURATION_DISPLAY_ADD_CATEGORY_BUTTON = 'teams/display_add_category_button';
export const TEAMS_DISPLAY_ADD_VENDOR_BUTTON = 'teams/display_add_vendor_button';
export const TEAMS_DISPLAY_ADD_VENDOR_AGENCY_BUTTON = 'teams/display_add_vendor_agency_button';
export const TEAMS_DISPLAY_ADD_HM_I_BUTTON = 'teams/display_add_hm_i_button';
export const TEAMS_DISPLAY_ADD_OTHER_TYPE_BUTTON = 'teams/display_add_other_type_button';
export const CANDIDATE_INSIGHTS_SECTION = 'candidate/insightss';
export const CANDIDATE_RE_ASSIGN = 'candidate/overview/re-assign';
export const CANDIDATE_OVERVIEW_MAIL = 'candidate/overview/mail';
export const CANDIDATE_OVERVIEW_OFFER_DETAILS_TAB = 'candidate/overview/offer-details-tab';
export const CANDIDATE_OVERVIEW_OVERVIEW_TAB = 'candidate/overview/overview-tab';
export const CANDIDATE_OVERVIEW_RESUME_TAB = 'candidate/overview/resume-tab';
export const TOGGLE_CANDIDATE_PREMIUM = 'candidate/overview/action-palette/toggle-candidate-premium';
export const CANDIDATE_OVERVIEW_HISTORY_TAB = 'candidate/overview/history-tab';
export const CANDIDATE_OVERVIEW_OFFER_LETTER_TAB = 'candidate/overview/offer-letter-tab';
export const CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE = 'candidate/overview/resume-tab/share-profile';
export const CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE = 'candidate/overview/resume-tab/download-profile';
export const CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE = 'candidate/overview/resume-tab/upload-profile';
export const CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER = 'candidate/overview/action-palette/assign-recruiter';
export const JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN = 'jobs/table/total-candidate-and-new-candidate-column';
export const JOBS_OVERVIEW_OVERVIEW_TAB = 'jobs/overview/overview-tab';
export const JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB = 'jobs/overview/process-workflow-tab';
export const JOBS_OVERVIEW_T500_TAB = 'jobs/overview/t500-tab';
export const JOBS_ASSIGNEE_WORKFLOW_EDIT = 'jobs/edit/assignee/workflow';
export const JOBS_TALENT500_TAB_PUBLISH_JOB = 'jobs/overview/t500-tab/publish-job';
export const JOBS_TALENT500_TAB_EDIT_JOB = 'jobs/overview/t500-tab/edit-job';
export const CANDIDATE_OVERVIEW_RE_ASSIGN_FETCH_ALL_JOBS = 'candidate/overview/re-assign/fetch-all-jobs';
export const CANDIDATE_OVERVIEW_PREMIUM = 'candidate/overview/premium';
export const JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION = 'jobs/overview/manage_view_jobs_position';
export const JOBS_ASSIGN_ROLES = 'jobs/page/assignee/second-stage';
export const SHOULD_DIRECTOR_PREFILLED = 'jobs/page/assignee/director-prefilled/second-stage';
export const CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE = 'candidate/overview/offer-letter-tab/share';
export const EDIT_JOBS_TABS_OVER_VIEW = 'jobs/edit/overview-tab';
export const CANDIDATE_OVERVIEW_RE_ASSIGN_IS_ASSIGN_FLAG = 'candidate/overview/re-assign/is_assigned';
export const CANDIDATE_TABLE_SOURCE_SOURCER_FILTER = 'candidate/table/source_sourcer_filter';
export const JOBS_OVERVIEW_TABS_WORKFLOW_EDIT = 'jobs/overview/assignee/workflow-edit';
export const JOB_SYNDICATION_CONTROL = 'job/overview/syndication_control';
export const SOURCING_MANAGEMENT_ACCESS = 'job/overview/sourcing_management';
export const CANDIDATE_COMPANY_AND_RECRUITER_FILTER = 'candidates/table/filter/company_and_recruiter';
export const DISPLAY_COMPANY_CONFIGURATION_TAB = 'configuration/company';
export const DISPLAY_CATEGORY_CONFIGURATION_TAB = 'configuration/category';
export const ADD_EDIT_DELETE_COMPANY = 'configuration/company/crud';

const {
  RECRUITER,
  ADMIN,
  MANAGER,
  VENDOR,
  INTERVIEWER,
  HIRING_MANAGER,
  TALENT_SCOUT,
  DIRECTOR,
  SENIOR_MANAGER,
  COORDINATOR,
  VENDOR_RPO,
  AUDITOR,
  HR_OPERATIONS_ASSOCIATE,
  PCP_ASSOCIATE,
  JOB_PAGE_REVIEWER,
  GROWTH_TEAM_ASSOCIATE,
  SOURCING_MANAGER,
  CUSTOMER_SUCCESS_ASSOCIATE,
  CATEGORY,
  COMPANY,
} = mapRolesToConstants;

const {
  RECRUITERS, VENDORS,
  HM_INTERVIEWERS, OTHERS,
  CATEGORIES, COMPANIES,
} = mapRolesToUserGroup;

export const ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES = {
  [ADMIN]: [
    VENDOR_AGENCY,
    ...RECRUITERS,
    ...VENDORS,
    ...HM_INTERVIEWERS,
    ...CATEGORIES,
    ...COMPANIES,
    ...OTHERS,
  ],
  [DIRECTOR]: [
    VENDOR_AGENCY,
    SENIOR_MANAGER,
    MANAGER,
    RECRUITER,
    TALENT_SCOUT,
    COORDINATOR,
    ...VENDORS,
    ...HM_INTERVIEWERS,
    ...CATEGORY,
    ...COMPANY,
    ...OTHERS,
  ],
  [CUSTOMER_SUCCESS_ASSOCIATE]: [
    VENDOR_AGENCY,
    SENIOR_MANAGER,
    MANAGER,
    RECRUITER,
    TALENT_SCOUT,
    COORDINATOR,
    ...VENDORS,
    ...HM_INTERVIEWERS,
    ...CATEGORY,
    ...COMPANY,
    ...OTHERS,
  ],
  [SENIOR_MANAGER]: [
    MANAGER,
    RECRUITER,
    TALENT_SCOUT,
    COORDINATOR,
    ...VENDORS,
    ...CATEGORY,
    ...COMPANY,
    ...HM_INTERVIEWERS,
  ],
  [MANAGER]: [
    RECRUITER,
    TALENT_SCOUT,
    COORDINATOR,
    SOURCING_MANAGER,
    ...VENDORS,
    ...CATEGORY,
    ...COMPANY,
    ...HM_INTERVIEWERS,
  ],
  [RECRUITER]: [
    TALENT_SCOUT,
    COORDINATOR,
    ...VENDORS,
    ...CATEGORY,
    ...COMPANY,
  ],
};

const getAddTeamMemberPrivileges = (role) => {
  const addMemberAccountOptions = ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES[role];
  const privilegesArray = [];

  const iterateCheckAndAddPrivilegeForAccountType = (accountTypeList, privilege) => {
    for (let i = 0; i < accountTypeList.length; i += 1) {
      if (addMemberAccountOptions.includes(accountTypeList[i])) {
        privilegesArray.push(privilege);
        return;
      }
    }
  };

  iterateCheckAndAddPrivilegeForAccountType(RECRUITERS, TEAMS_DISPLAY_ADD_RECRUITER_BUTTON);
  iterateCheckAndAddPrivilegeForAccountType(VENDORS, TEAMS_DISPLAY_ADD_VENDOR_BUTTON);
  iterateCheckAndAddPrivilegeForAccountType(HM_INTERVIEWERS, TEAMS_DISPLAY_ADD_HM_I_BUTTON);
  iterateCheckAndAddPrivilegeForAccountType(OTHERS, TEAMS_DISPLAY_ADD_OTHER_TYPE_BUTTON);
  iterateCheckAndAddPrivilegeForAccountType(CATEGORIES, CONFIGURATION_DISPLAY_ADD_CATEGORY_BUTTON);

  return privilegesArray;
};

export const PRIVILEGES = {
  [ADMIN]: { // RA
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      DASHBOARD,
      CANDIDATE,
      JOB,
      SETTINGS,
      SYNDICATION_PARTNERS,
      ADD_CANDIDATE,
      ADD_JOBS,
      EDIT_JOBS,
      LANDING_PAGE,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_COMPLETE_HISTORY,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_TABLE_CHECKBOX,
      TEAMS,
      CONFIGURATION,
      ...getAddTeamMemberPrivileges(ADMIN),
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_PROFILE_EDIT_SOURCE,
      LIVE_CV,
      CANDIDATE_RE_ASSIGN,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE,
      CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER,
      CANDIDATE_PROFILE_EDIT,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      JOBS_ASSIGNEE_WORKFLOW_EDIT,
      JOBS_TALENT500_TAB_PUBLISH_JOB,
      JOBS_TALENT500_TAB_EDIT_JOB,
      JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION,
      JOBS_ASSIGN_ROLES,
      CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE,
      EDIT_JOBS_TABS_OVER_VIEW,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      JOBS_OVERVIEW_TABS_WORKFLOW_EDIT,
      TEAMS_DISPLAY_ADD_VENDOR_AGENCY_BUTTON,
      JOB_SYNDICATION_CONTROL,
      SOURCING_MANAGEMENT_ACCESS,
      CANDIDATE_OVERVIEW_PREMIUM,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
      DISPLAY_COMPANY_CONFIGURATION_TAB,
      DISPLAY_CATEGORY_CONFIGURATION_TAB,
      ADD_EDIT_DELETE_COMPANY,
    ],
    dynamic: {
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
    },
  },
  [DIRECTOR]: { // DIR
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      DASHBOARD,
      LANDING_PAGE,
      CANDIDATE,
      JOB,
      SETTINGS,
      TEAMS,
      ADD_CANDIDATE,
      ADD_JOBS,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_TABLE_CHECKBOX,
      CANDIDATE_RE_ASSIGN,
      LIVE_CV,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_OVERVIEW_OFFER_DETAILS_TAB,
      CANDIDATE_OFFER_DETAILS_EDIT,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER,
      CANDIDATE_COMPLETE_HISTORY,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      EDIT_JOBS,
      JOBS_ASSIGNEE_WORKFLOW_EDIT,
      ...getAddTeamMemberPrivileges(DIRECTOR),
      CANDIDATE_OVERVIEW_RE_ASSIGN_FETCH_ALL_JOBS,
      JOBS_ASSIGN_ROLES,
      CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      TEAMS_DISPLAY_ADD_VENDOR_AGENCY_BUTTON,
      CANDIDATE_OVERVIEW_PREMIUM,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE]:
        ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [SHOULD_DIRECTOR_PREFILLED]: ({
        isEditMode,
      }) => (!(isEditMode)),
      [EDIT_JOBS_TABS_OVER_VIEW]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_TALENT500_TAB_PUBLISH_JOB]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_TALENT500_TAB_EDIT_JOB]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_TABS_WORKFLOW_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
    },
  },
  [CUSTOMER_SUCCESS_ASSOCIATE]: { // CSA
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      DASHBOARD,
      LANDING_PAGE,
      CANDIDATE,
      JOB,
      SETTINGS,
      TEAMS,
      CONFIGURATION,
      ADD_CANDIDATE,
      ADD_JOBS,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_TABLE_CHECKBOX,
      CANDIDATE_RE_ASSIGN,
      LIVE_CV,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_OVERVIEW_OFFER_DETAILS_TAB,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER,
      CANDIDATE_COMPLETE_HISTORY,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      EDIT_JOBS,
      JOBS_ASSIGNEE_WORKFLOW_EDIT,
      ...getAddTeamMemberPrivileges(DIRECTOR),
      CANDIDATE_OVERVIEW_RE_ASSIGN_FETCH_ALL_JOBS,
      JOBS_ASSIGN_ROLES,
      CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      TEAMS_DISPLAY_ADD_VENDOR_AGENCY_BUTTON,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
      DISPLAY_COMPANY_CONFIGURATION_TAB,
      ADD_EDIT_DELETE_COMPANY,
    ],
    dynamic: {
      [CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE]:
        ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [EDIT_JOBS_TABS_OVER_VIEW]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_TALENT500_TAB_PUBLISH_JOB]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_TALENT500_TAB_EDIT_JOB]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_TABS_WORKFLOW_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
    },
  },
  [SENIOR_MANAGER]: { // SRM
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      DASHBOARD,
      LANDING_PAGE,
      CANDIDATE,
      JOB,
      SETTINGS,
      TEAMS,
      ADD_CANDIDATE,
      ADD_JOBS,
      LIVE_CV,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_TABLE_CHECKBOX,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_OVERVIEW_OFFER_DETAILS_TAB,
      CANDIDATE_OFFER_DETAILS_EDIT,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER,
      CANDIDATE_COMPLETE_HISTORY,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      EDIT_JOBS,
      JOBS_ASSIGNEE_WORKFLOW_EDIT,
      ...getAddTeamMemberPrivileges(SENIOR_MANAGER),
      JOBS_ASSIGN_ROLES,
      CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE,
      CANDIDATE_OVERVIEW_RE_ASSIGN_IS_ASSIGN_FLAG,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      TEAMS_DISPLAY_ADD_VENDOR_AGENCY_BUTTON,
      CANDIDATE_OVERVIEW_PREMIUM,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE]:
        ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [EDIT_JOBS_TABS_OVER_VIEW]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_TALENT500_TAB_PUBLISH_JOB]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_TALENT500_TAB_EDIT_JOB]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_RE_ASSIGN]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_TABS_WORKFLOW_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
    },
  },
  [MANAGER]: { // RM
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      DASHBOARD,
      CANDIDATE,
      JOB,
      SETTINGS,
      ADD_CANDIDATE,
      ADD_JOBS,
      EDIT_JOBS,
      LANDING_PAGE,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_COMPLETE_HISTORY,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_TABLE_CHECKBOX,
      TEAMS,
      ...getAddTeamMemberPrivileges(MANAGER),
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_PROFILE_EDIT_SOURCE,
      LIVE_CV,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_OVERVIEW_OFFER_DETAILS_TAB,
      CANDIDATE_OFFER_DETAILS_EDIT,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      JOBS_ASSIGNEE_WORKFLOW_EDIT,
      JOBS_ASSIGN_ROLES,
      CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      TEAMS_DISPLAY_ADD_VENDOR_AGENCY_BUTTON,
      CANDIDATE_OVERVIEW_PREMIUM,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE]:
        ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [EDIT_JOBS_TABS_OVER_VIEW]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_TALENT500_TAB_PUBLISH_JOB]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_TALENT500_TAB_EDIT_JOB]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_RE_ASSIGN]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_TABS_WORKFLOW_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
    },
  },
  [RECRUITER]: { // R
    static: [
      DASHBOARD,
      CANDIDATE,
      JOB,
      SETTINGS,
      ADD_CANDIDATE,
      ADD_JOBS,
      EDIT_JOBS,
      LANDING_PAGE,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_COMPLETE_HISTORY,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_TABLE_CHECKBOX,
      TEAMS,
      ...getAddTeamMemberPrivileges(RECRUITER),
      CANDIDATE_INSIGHTS_SECTION,
      LIVE_CV,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_OVERVIEW_OFFER_DETAILS_TAB,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_TALENT500_TAB_PUBLISH_JOB,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      JOBS_ASSIGN_ROLES,
      CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      CANDIDATE_OVERVIEW_PREMIUM,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE]:
        ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
      [JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_ASSIGNEE_WORKFLOW_EDIT]: ({ isEditMode }) => !isEditMode,
      [EDIT_JOBS_TABS_OVER_VIEW]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_TALENT500_TAB_EDIT_JOB]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_RE_ASSIGN]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
    },
  },
  [TALENT_SCOUT]: { // S
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      CANDIDATE,
      JOB,
      SETTINGS,
      ADD_CANDIDATE,
      LANDING_PAGE,
      JOBS_OVERVIEW_ASSIGNE,
      CANDIDATE_TABLE_CHECKBOX,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_INSIGHTS_SECTION,
      LIVE_CV,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      CANDIDATE_OVERVIEW_PREMIUM,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE]:
        ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_TALENT500_TAB_EDIT_JOB]: ({ isJobAssigned }) => isJobAssigned,
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
      [CANDIDATE_RE_ASSIGN]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
    },
  },
  [SOURCING_MANAGER]: { // SM
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      CANDIDATE,
      JOB,
      SETTINGS,
      ADD_CANDIDATE,
      LANDING_PAGE,
      JOBS_OVERVIEW_ASSIGNE,
      CANDIDATE_TABLE_CHECKBOX,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_INSIGHTS_SECTION,
      LIVE_CV,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      SOURCING_MANAGEMENT_ACCESS,
      CANDIDATE_OVERVIEW_PREMIUM,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE]:
        ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_TALENT500_TAB_EDIT_JOB]: ({ isJobAssigned }) => isJobAssigned,
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
      [CANDIDATE_RE_ASSIGN]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
    },
  },
  [COORDINATOR]: { // RC
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      LANDING_PAGE,
      CANDIDATE,
      JOB,
      SETTINGS,
      LIVE_CV,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_COMPLETE_HISTORY,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
    },
  },
  [INTERVIEWER]: { // I
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      CANDIDATE,
      JOB,
      SETTINGS,
      LANDING_PAGE,
      LIVE_CV,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_COMPLETE_HISTORY,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
    ],
    dynamic: {
    },
  },
  [HIRING_MANAGER]: { // HM
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      CANDIDATE,
      JOB,
      SETTINGS,
      LANDING_PAGE,
      LIVE_CV,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_COMPLETE_HISTORY,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
    ],
    dynamic: {
    },
  },
  [VENDOR]: { // ER
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      CANDIDATE,
      JOB,
      SETTINGS,
      ADD_CANDIDATE,
      LANDING_PAGE,
      // LIVE_CV,
      JOBS_OVERVIEW_ASSIGNE,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE,
      CANDIDATE_PROFILE_EDIT,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
    },
  },
  [VENDOR_RPO]: { // RPO
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      DASHBOARD,
      LANDING_PAGE,
      CANDIDATE,
      JOB,
      SETTINGS,
      ADD_JOBS,
      ADD_CANDIDATE,
      LIVE_CV,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_TABLE_CHECKBOX,
      CANDIDATE_OVERVIEW_MAIL,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER,
      CANDIDATE_COMPLETE_HISTORY,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      JOBS_TALENT500_TAB_EDIT_JOB,
      JOBS_TALENT500_TAB_PUBLISH_JOB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE,
      EDIT_JOBS_TABS_OVER_VIEW,
      EDIT_JOBS,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE]:
        ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
      [JOBS_ASSIGN_ROLES]: ({ isEditMode }) => !isEditMode,
      [JOBS_ASSIGNEE_WORKFLOW_EDIT]: ({ isEditMode }) => !isEditMode,
    },
  },
  [AUDITOR]: { // AUD
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      LANDING_PAGE,
      CANDIDATE,
      JOB,
      SETTINGS,
      TEAMS,
      LIVE_CV,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_COMPLETE_HISTORY,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
    },
  },
  [HR_OPERATIONS_ASSOCIATE]: { // HROA
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      DASHBOARD,
      LANDING_PAGE,
      CANDIDATE,
      JOB,
      SETTINGS,
      LIVE_CV,
      CANDIDATE_TABLE_ACTION_COLUMN,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_OVERVIEW_OFFER_DETAILS_TAB,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_COMPLETE_HISTORY,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [CANDIDATE_PROFILE_EDIT]: ({ isUserInHiringTeam }) => isUserInHiringTeam,
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
    },
  },
  [PCP_ASSOCIATE]: { // PCPA
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      LANDING_PAGE,
      CANDIDATE,
      JOB,
      SETTINGS,
      LIVE_CV,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_COMPLETE_HISTORY,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      EDIT_JOBS,
      JOBS_TALENT500_TAB_EDIT_JOB,
      EDIT_JOBS_TABS_OVER_VIEW,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
    },
  },
  [JOB_PAGE_REVIEWER]: { // JPR
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      LANDING_PAGE,
      JOB,
      SETTINGS,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      EDIT_JOBS,
      // LIVE_CV,
      JOBS_TALENT500_TAB_EDIT_JOB,
      JOB_SUBMIT_REVIEW,
      EDIT_JOBS_TABS_OVER_VIEW,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
    },
  },
  [GROWTH_TEAM_ASSOCIATE]: { // GTA
    static: [
      ANALYTICS,
      VIEW_ANALYTICS_JOB_STATUS,
      VIEW_ANALYTICS_SCORECARD,
      VIEW_ANALYTICS_TRENDLINE,
      VIEW_ANALYTICS_REPORT,
      LANDING_PAGE,
      CANDIDATE,
      JOB,
      SETTINGS,
      TEAMS,
      LIVE_CV,
      CANDIDATE_PRE_CANVAS_APPLICANTS,
      CANDIDATE_ACTION_PALETTE,
      CANDIDATE_INSIGHTS_SECTION,
      CANDIDATE_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB,
      CANDIDATE_OVERVIEW_HISTORY_TAB,
      CANDIDATE_OVERVIEW_OFFER_LETTER_TAB,
      CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
      CANDIDATE_COMPLETE_HISTORY,
      JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
      JOBS_OVERVIEW_OVERVIEW_TAB,
      CANDIDATE_TABLE_SOURCE_SOURCER_FILTER,
      JOB_SYNDICATION_CONTROL,
      SYNDICATION_PARTNERS,
      ADD_SYNDICATION_PARTNER,
      CANDIDATE_OVERVIEW_PREMIUM,
      TOGGLE_CANDIDATE_PREMIUM,
      // CANDIDATE_COMPANY_AND_RECRUITER_FILTER,
    ],
    dynamic: {
      [JOBS_OVERVIEW_PROCESS_WORKFLOW_TAB]: ({ status, SOURCING_DRAFT }) => {
        if (status === SOURCING_DRAFT) return false;
        return true;
      },
      [JOBS_OVERVIEW_T500_TAB]: ({
        status, SOURCING_DRAFT, CANCELLED, CLOSED,
      }) => {
        if (status === SOURCING_DRAFT || status === CANCELLED || status === CLOSED) return false;
        return true;
      },
      [JOBS_OVERVIEW_REVIEW]: ({ isReviewed }) => isReviewed,
    },
  },
};
