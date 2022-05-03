import API_END_POINTS from 'src/web/ats/config/integrations';
import toaster from 'src/web/ats/components/atoms/toaster';
import { getApiWithResponseObject, getAuthToken, postWithResponseObject } from 'src/config/utils';
import { RESPONSE_CODES } from 'src/config/definitions';
import { API_BASE_URL } from 'src/config/env';

const GetAssociatedRecruiters = () => {
  const getAssociatedRecruiters = async (jobId) => {
    const headers = { authorization: getAuthToken() };
    const response = await getApiWithResponseObject(
      `${API_BASE_URL()}${API_END_POINTS.getAssociatedRecruiters(jobId)}`,
      headers,
    );

    if (response && !(response.status === RESPONSE_CODES.OK)) {
      toaster({
        type: 'error',
        msg: 'Unable to fetch associated recruiter list',
      });
    }
    return response?.data;
  };

  const changeRecruiter = async (jobApplicationId, payload) => {
    const headers = { authorization: getAuthToken() };
    const response = await postWithResponseObject(
      `${API_BASE_URL()}${API_END_POINTS.requestAssignRecruiter(jobApplicationId)}`,
      payload,
      headers,
    );

    if (response && (response.status === RESPONSE_CODES.OK)) {
      toaster({ type: 'success', msg: response?.data });
    } else {
      toaster({
        type: 'error',
        msg: 'Unable to make a request, please try again!',
        unique: true,
      });
    }
    return response?.data;
  };

  return {
    getAssociatedRecruiters,
    changeRecruiter,
  };
};

export default GetAssociatedRecruiters;
