import API_END_POINTS from 'src/web/ats/config/integrations';
import toaster from 'src/web/ats/components/atoms/toaster';
import { RESPONSE_CODES } from 'src/config/definitions';
import { getApiWithResponseObject, getAuthToken } from 'src/config/utils';

const UseCandidateSourcesForm = () => {
  const getCandidateSourcer = async (jobId) => {
    const headers = { authorization: getAuthToken() };
    const response = await getApiWithResponseObject(
      API_END_POINTS.candidateJobSourcer(jobId),
      headers,
    );

    if (response && !(response.status === RESPONSE_CODES.OK)) {
      toaster({ type: 'error', msg: 'Unable to load sourcer' });
    }
    return response.data;
  };

  const getCandidateSource = async (jobId) => {
    const headers = { authorization: getAuthToken() };
    const response = await getApiWithResponseObject(
      API_END_POINTS.candidateJobSource(jobId),
      headers,
    );

    if (response && !(response.status === RESPONSE_CODES.OK)) {
      toaster({ type: 'error', msg: 'Unable to load source' });
    }
    return response.data;
  };

  return {
    getCandidateSourcer,
    getCandidateSource,
  };
};

export default UseCandidateSourcesForm;
