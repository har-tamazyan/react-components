import { FILTER_TYPES } from 'src/web/ats/components/atoms/filters/constants';

export const FILTERS = {
  filters: [
    {
      title: 'Company',
      id: 'company',
      type: FILTER_TYPES.SINGLE_SELECT_DROPDOWN,
      isHiddenByDefault: false,
      payload: {
        filter_name: 'company',
        dropdown_type: 'singleSelectDropdown',
        company: 'all_client',
        index: 'user',
        filter_id: 'company_name.raw',
        search_id: 'company',
        search_input: '',
      },
    },
    {
      title: 'Employment Type',
      id: 'Employment Type',
      type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        index: 'job',
        filter_name: 'Employment Type',
        filter_id: 'employment_type.raw',
        dropdown_type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
        search_id: 'employment_type',
        search_input: '',
        company: '',
      },
      detailsDataPayload: {
        filter_id: 'employment_type.raw',
        filter_type: 'all',
        filter_value: [],
      },
    },
    {
      title: 'Segment',
      id: 'Segment',
      type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        index: 'job',
        filter_name: 'Segment',
        filter_id: 'segment.raw',
        dropdown_type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
        search_id: 'segment',
        search_input: '',
        company: '',
      },
      detailsDataPayload: {
        filter_id: 'segment.raw',
        filter_type: 'all',
        filter_value: [],
      },
    },
    {
      title: 'Business Leader',
      id: 'Business Leader',
      type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        index: 'job',
        filter_name: 'Business Leader',
        filter_id: 'business_leader.raw',
        dropdown_type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
        search_id: 'business_leader',
        search_input: '',
        company: '',
      },
      detailsDataPayload: {
        filter_id: 'business_leader.raw',
        filter_type: 'all',
        filter_value: [],
      },
    },
    {
      title: 'Hiring Manager',
      id: 'Hiring Manager',
      type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        index: 'job',
        filter_name: 'Hiring Manager',
        filter_id: 'hiring_manager.raw',
        dropdown_type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
        search_id: 'hiring_manager',
        search_input: '',
        company: '',
      },
      detailsDataPayload: {
        filter_id: 'hiring_manager.raw',
        filter_type: 'all',
        filter_value: [],
      },
    },
    {
      title: 'Recruiting Manager',
      id: 'Recruiting Manager',
      type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        index: 'job',
        filter_name: 'Recruiting Manager',
        filter_id: 'recruiting_manager.raw',
        dropdown_type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
        search_id: 'recruiting_manager',
        search_input: '',
        company: '',
      },
      detailsDataPayload: {
        filter_id: 'recruiting_manager.raw',
        filter_type: 'all',
        filter_value: [],
      },
    },
    {
      title: 'Recruiter',
      id: 'Recruiter',
      type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        index: 'job',
        filter_name: 'Recruiter',
        nested_path_id: 'job_hiring_team',
        filter_value_id: 'job_hiring_team.role.raw',
        filter_id: 'job_hiring_team.role.raw::job_hiring_team.user_id::job_hiring_team.user_name.raw',
        filter_value: 'R',
        dropdown_type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
        search_id: 'job_hiring_team.user_name',
        search_input: '',
        company: '',
      },
      detailsDataPayload: {
        nested_path_id: 'job_hiring_team',
        nested_filter_value_id: 'job_hiring_team.role.raw',
        nested_filter_value: 'R',
        filter_id: 'job_hiring_team.user_id',
        filter_type: 'all',
        filter_value: [],
      },
    },
    {
      title: 'Senior Manager',
      id: 'Senior Manager',
      type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        index: 'job',
        filter_name: 'Senior Manager',
        nested_path_id: 'job_hiring_team',
        filter_id: 'job_hiring_team.role.raw::job_hiring_team.user_id::job_hiring_team.user_name.raw',
        filter_value_id: 'job_hiring_team.role.raw',
        filter_value: 'SRM',
        dropdown_type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
        search_id: 'job_hiring_team.user_name',
        search_input: '',
        company: '',
      },
      detailsDataPayload: {
        nested_path_id: 'job_hiring_team',
        nested_filter_value_id: 'job_hiring_team.role.raw',
        nested_filter_value: 'SRM',
        filter_id: 'job_hiring_team.user_id',
        filter_type: 'all',
        filter_value: [],
      },
    },
    {
      title: 'Director',
      id: 'Director',
      type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        company: '',
        index: 'job',
        filter_name: 'Director',
        nested_path_id: 'job_hiring_team',
        filter_id: 'job_hiring_team.role.raw::job_hiring_team.user_id::job_hiring_team.user_name.raw',
        filter_value_id: 'job_hiring_team.role.raw',
        filter_value: 'DIR',
        dropdown_type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
        search_id: 'job_hiring_team.user_name',
        search_input: '',
      },
      detailsDataPayload: {
        nested_path_id: 'job_hiring_team',
        nested_filter_value_id: 'job_hiring_team.role.raw',
        nested_filter_value: 'DIR',
        filter_id: 'job_hiring_team.user_id',
        filter_type: 'all',
        filter_value: [],
      },
    },
    // {
    //   title: 'Talent Scout',
    //   id: 'Talent Scout',
    //   type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
    //   isHiddenByDefault: true,
    //   payload: {
    //     company: '',
    //     index: 'job',
    //     filter_name: 'Talent Scout',
    //     nested_path_id: 'job_hiring_team',
    //     filter_id: 'job_hiring_team.role.raw::
    // job_hiring_team.user_id::job_hiring_team.user_name.raw',
    //     filter_value_id: 'job_hiring_team.role.raw',
    //     filter_value: 'S',
    //     dropdown_type: 'multiSelectDropdown',
    //     search_id: 'job_hiring_team.user_name',
    //     // search_input: '',
    //     // size: '',
    //   },
    // },
    {
      title: 'Job Code',
      id: 'Job Code',
      type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        index: 'job',
        filter_name: 'Job Code',
        filter_id: 'job_code.raw',
        dropdown_type: FILTER_TYPES.MULTI_SELECT_DROPDOWN,
        search_id: 'job_code',
        search_input: '',
        company: '',
      },
      detailsDataPayload: {
        filter_id: 'job_code.raw',
        filter_type: 'all',
        filter_value: [],
      },
    },
    {
      title: 'Group By',
      id: 'Group By',
      type: FILTER_TYPES.SINGLE_SELECT_DROPDOWN,
      isHiddenByDefault: true,
      payload: {
        index: 'group',
        filter_name: 'Group By',
        filter_id: 'group_by.raw',
        dropdown_type: FILTER_TYPES.SINGLE_SELECT_DROPDOWN,
        search_id: 'group_by',
        search_input: '',
        company: '',
        options: [
          {
            label: 'Employment Type',
            value: 'Employment Type',
          },
          {
            label: 'Segment',
            value: 'Segment',
          },
          {
            label: 'Business Leader',
            value: 'Business Leader',
          },
          {
            label: 'Hiring Manager',
            value: 'Hiring Manager',
          },
          {
            label: 'Recruiting Manager',
            value: 'Recruiting Manager',
          },
          {
            label: 'Recruiter',
            value: 'Recruiter',
          },
          {
            label: 'Senior Manager',
            value: 'Senior Manager',
          },
          {
            label: 'Director',
            value: 'Director',
          },
          {
            label: 'Job Code',
            value: 'Job Code',
          },
        ],
      },
      detailsDataPayload: {
        filter_id: 'group_by.raw',
        filter_type: 'all',
        filter_value: [],
      },
    },
    {
      title: 'Date Picker',
      id: 'dp',
      type: FILTER_TYPES.DATE_FROM_TO,
      startDate: new Date(new Date() - 90 * 24 * 3600000),
      endDate: new Date(),
      isHiddenByDefault: false,
    },
  ],
  table_source: [
    'id', 'job_code', 'title',
    'no_of_positions', 'open_date',
    'status', 'job_created_by', 'hiring_manager', 'position',
  ],
  export_source: [
    'id', 'job_code', 'title',
    'no_of_positions', 'created_at',
    'status', 'job_create_by', 'hiring_manager',
  ],
};
