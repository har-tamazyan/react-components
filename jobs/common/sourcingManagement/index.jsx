import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { getApiWithResponseObject, getAuthToken } from 'src/config/utils';
import { RESPONSE_CODES } from 'src/config/definitions';
import API_END_POINTS from 'src/web/ats/config/integrations';
import { API_BASE_URL } from 'src/config/env';
import { mapRolesToConstants } from 'src/config/definitions.js';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import AddIcon from 'src/web/ats/assets/icons/add-icon.svg';
import * as S from './styles';

const SOURCING_CHANNEL_OPTIONS = ['Fastnext', 'Razor', 'Manual', 'Automated'];

const emptySourcerData = {
  user_id: null,
  sourcing_channels: [],
};

const SourcingManagement = ({
  initialSourcersData = [],
  updateSourcersValues,
  readOnly = false,
}) => {
  const [selectedSourcersData, setSelectedSourcersData] = useState(
    initialSourcersData.length > 0 ? initialSourcersData : [emptySourcerData],
  );

  const [sourcerOptionsData, setSourcerOptionsData] = useState([]);

  const fetchTalentSourcersData = async () => {
    const headers = { authorization: getAuthToken() };
    const response = await getApiWithResponseObject(
      `${API_BASE_URL()}${API_END_POINTS.getUsersList}?role=${mapRolesToConstants.TALENT_SCOUT}`,
      headers,
    );

    if (response && response.status === RESPONSE_CODES.OK) {
      setSourcerOptionsData(response.data?.data || []);
    }
  };

  useEffect(() => {
    fetchTalentSourcersData();
  }, []);

  const sourcersListLabelValueMap = sourcerOptionsData.map((sourcer) => ({
    node: <div>{sourcer.name} <S.LightText>({sourcer.email})</S.LightText></div>,
    label: `${sourcer.name} (${sourcer.email})`,
    value: sourcer.id,
  }));

  const handleSourcerInput = (key, index) => (_, selectedOption) => {
    const updatedSelectedSourcersData = cloneDeep(selectedSourcersData);
    if (key === 'talent_scout') updatedSelectedSourcersData[index].user_id = selectedOption.value;
    if (key === 'sourcing_channels') updatedSelectedSourcersData[index].sourcing_channels = selectedOption;
    setSelectedSourcersData(updatedSelectedSourcersData);
    if (updateSourcersValues) updateSourcersValues(updatedSelectedSourcersData);
  };

  const addSourcerRow = () => {
    setSelectedSourcersData([...selectedSourcersData, cloneDeep(emptySourcerData)]);
  };

  const removeSourcerRow = (index) => {
    const sourcersDataCopy = cloneDeep(selectedSourcersData);
    if (index === 0 && sourcersDataCopy.length === 1) {
      setSelectedSourcersData([cloneDeep(emptySourcerData)]);
      if (updateSourcersValues) updateSourcersValues([]);
      return;
    }
    sourcersDataCopy.splice(index, 1);
    setSelectedSourcersData([...sourcersDataCopy]);
    if (updateSourcersValues) updateSourcersValues([...sourcersDataCopy]);
  };

  if (readOnly) {
    return (<S.ViewModeContainer>
      <S.SourcingManageHeading>Talent Scout</S.SourcingManageHeading>
      <S.SourcingManageHeading>Sourcing Channel(s)</S.SourcingManageHeading>
      {selectedSourcersData.map((sourcerData, index) => (<React.Fragment key={`sourcer-view-${index}`}>
        <S.SourcerDetails>
          {(sourcerOptionsData.find((_) => _.id === sourcerData.user_id) || {}).name}
        </S.SourcerDetails>
        <S.SourcerDetails>{(sourcerData.sourcing_channels || []).join(', ')}</S.SourcerDetails>
      </React.Fragment>))}
    </S.ViewModeContainer>);
  }

  return (<S.Container>
{ selectedSourcersData.length > 0 ? selectedSourcersData.map((sourcerData, index) => (<S.CustomDropdown key={`sourcer-modify-${index}`}>
     <div>
     {index === 0 ? <S.DropdownTitle>Talent Scout</S.DropdownTitle> : <S.EmptyTitleFill />}
      <S.DropdownWrapper className={'sourcer_input_wrapper'}>
       <DropDown
          options={
            sourcersListLabelValueMap.filter(
              (_) => !selectedSourcersData.find((__) => __.user_id === _.value),
            )
          }
          placeholder={'Select Talent Scout'}
          onOptionSelect={handleSourcerInput('talent_scout', index)}
          selected={sourcersListLabelValueMap.find((_) => _.value === sourcerData.user_id)}
          isSearchable
        />
     </S.DropdownWrapper>
     </div>
     <div>
       <S.EmptyTitleFill />
       <S.SelectSourcingChannelContainer>
       <S.DropdownWrapper className={'sourcer_input_wrapper'}>
          <DropDown
            options={SOURCING_CHANNEL_OPTIONS}
            placeholder={'Select Sourcing Channel'}
            onOptionSelect={handleSourcerInput('sourcing_channels', index)}
            isMultiSelect
            required={Boolean(sourcerData.user_id)}
            selected={sourcerData.sourcing_channels}
          />
        </S.DropdownWrapper>
         <S.DeleteIconContainer className={'sourcer_input_add_remove_icon'}>
            <img
            src={DeleteIcon}
            alt='Delete Talent Scout'
            onClick={() => removeSourcerRow(index)}
            />
          </S.DeleteIconContainer>
           {index === selectedSourcersData.length - 1 ? <S.AddIconContainer className={'sourcer_input_add_remove_icon'}>
            <img
            src={AddIcon}
            onClick={addSourcerRow}
            alt='Add Talent Scout'
            />
          </S.AddIconContainer> : null}
          </S.SelectSourcingChannelContainer>
        </div>
    </S.CustomDropdown>)) : null}
</S.Container>);
};

SourcingManagement.propTypes = {
  initialSourcersData: PropTypes.array,
  updateSourcersValues: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default SourcingManagement;
