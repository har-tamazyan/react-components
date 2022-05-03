import API_END_POINTS from 'src/web/ats/config/integrations';
import { postWithResponseObject, getAuthToken } from 'src/config/utils';
import { API_BASE_URL } from 'src/config/env';

const ApproveAssignedRecruiter = () => {
  const approveAssignedRecruiter = async (jobId, payload) => {
    const headers = { authorization: getAuthToken() };
    const response = await postWithResponseObject(
      `${API_BASE_URL()}${API_END_POINTS.approveAssignedRecruiter(jobId)}`,
      payload,
      headers,
    );
    return response;
  };

  return {
    approveAssignedRecruiter,
  };
};

export default ApproveAssignedRecruiter;
