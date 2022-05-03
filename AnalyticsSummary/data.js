import { FILTER_TYPES } from 'src/web/ats/components/atoms/filters/constants';

// All keys in the table are required in every object with null or default value
export const SUMMARY_DATA_TYPE = {
  TABLE: 'Table',
  DONUT_CHART: 'DonutChart',
  LINE_CHART: 'LineChart',
  BAR_CHART: 'BarChart',
};

export const SUMMARY_DATA = [
  {
    title: 'Recruiter Performance',
    type: SUMMARY_DATA_TYPE.TABLE,
    values: [
      {
        name: 'Aditya', age: 30, location: 'Bangalore', country: 'India', pincode: 452009,
      },
      {
        name: 'Madhav', age: 20, location: 'Mumbai', country: '', pincode: null,
      },
      {
        name: 'Jalpesh', age: 27, location: 'Chennai', country: '', pincode: null,
      },
      {
        name: 'Hovhannes', age: 28, location: null, country: '', pincode: null,
      },
      {
        name: 'Junrill', age: 29, location: 'Hyderabad', country: '', pincode: null,
      },
      {
        name: 'Niranjan', age: 24, location: 'Kolkata', country: '', pincode: null,
      },
      {
        name: 'Rahul', age: 27, location: 'Chennai', country: '', pincode: null,
      },
      {
        name: 'Giri', age: 28, location: null, country: '', pincode: null,
      },
      {
        name: 'Anand', age: 29, location: 'Hyderabad', country: '', pincode: null,
      },
      {
        name: 'Manju', age: 24, location: 'Kolkata', country: '', pincode: null,
      },
    ],
  },
  {
    title: 'Company Performance',
    type: SUMMARY_DATA_TYPE.DONUT_CHART,
    values: [
      { name: 'Group A', value: 50 },
      { name: 'Group B', value: 30 },
      { name: 'Group C', value: 10 },
      { name: 'Group D', value: 10 },
    ],
    dataKey: 'value',
  },
  {
    title: 'Manager Performance',
    type: SUMMARY_DATA_TYPE.LINE_CHART,
    dataKey: [{ key: 'heartBeat', color: '#8884D8', name: 'Heart Beat' }, { key: 'glucose', color: '#1568D8', name: 'Glucose' }],
    xAxisKey: 'time',
    values: [
      { heartBeat: 14, glucose: 58, time: 1503617297689 },
      { heartBeat: 15, glucose: 61, time: 1503616962277 },
      { heartBeat: 15, glucose: 41, time: 1503616882654 },
      { heartBeat: 20, glucose: 38, time: 1503613184594 },
      { heartBeat: 15, glucose: 53, time: 1503611308914 },
    ],
  },
  {
    title: 'Senior Manager Performance',
    type: SUMMARY_DATA_TYPE.BAR_CHART,
    dataKey: 'name',
    dataKeys: [
      { key: 'Ram', color: '#8884d8' },
      { key: 'Laxman', color: '#1568d8' },
    ],
    values: [
      {
        name: 'Salary',
        Ram: 4000,
        Laxman: 2400,
      },
      {
        name: 'Age',
        Ram: 30,
        Laxman: 13,
      },
      {
        name: 'Page C',
        Ram: 2000,
        Laxman: 9800,
      },
      {
        name: 'Page D',
        Ram: 2780,
        Laxman: 3908,
      },
      {
        name: 'Page E',
        Ram: 1890,
        Laxman: 4800,
      },
      {
        name: 'Page F',
        Ram: 2390,
        Laxman: 3800,
      },
      {
        name: 'Page G',
        Ram: 3490,
        Laxman: 4300,
      },
    ],
  },
];

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
};
