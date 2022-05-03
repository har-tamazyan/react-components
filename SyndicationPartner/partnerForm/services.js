import API_END_POINTS from 'src/web/ats/config/integrations';
import toaster from 'src/web/ats/components/atoms/toaster';
import { getApiWithResponseObject, getAuthToken } from 'src/config/utils';
import { RESPONSE_CODES } from 'src/config/definitions';
import { API_BASE_URL } from 'src/config/env';

const UsePartnerForm = () => {
  const getGeographies = async () => {
    const headers = { authorization: getAuthToken() };
    const response = await getApiWithResponseObject(
      `${API_BASE_URL()}${API_END_POINTS.getGeographies}`,
      headers,
    );

    if (response && !(response.status === RESPONSE_CODES.OK)) {
      toaster({
        type: 'error',
        msg: 'Unable to fetch geographies',
      });
    }
    return response.data?.data;
  };

  const getCategories = async () => {
    const headers = { authorization: getAuthToken() };
    const response = await getApiWithResponseObject(
      `${API_BASE_URL()}${API_END_POINTS.getSyndicationPartnerCategories}?search=false`,
      headers,
    );

    if (response && !(response.status === RESPONSE_CODES.OK)) {
      toaster({
        type: 'error',
        msg: 'Unable to fetch categories',
      });
    }
    return response.data?.data;
  };

  return {
    getGeographies,
    getCategories,
  };
};

export default UsePartnerForm;
