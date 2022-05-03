import { GLOBAL_COUNTRY_CODE } from 'src/constants/index.js';


export const getValidateFieldsFuncForSaveJobForm = (setCanSaveJobForm) => (stepForm) => {
  let validityCheck = true;
  const minFieldList = ['job_code', 'company', 'title', 'countries', 'location'];
  minFieldList.forEach((field) => {
    if (!(stepForm[field])) {
      // This means location is not required if the country is world wide
      if (field === 'location') {
        if ((stepForm?.countries ?? []).includes(GLOBAL_COUNTRY_CODE)) validityCheck = true;
      }
    }
  });
  setCanSaveJobForm(validityCheck);
};
