import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, debounce } from 'lodash';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import AddIcon from 'src/web/ats/assets/icons/add-icon.svg';
import * as S from './styles';


const emptyLocationData = {
  country: null,
  locations: [],
};

const JobLocation = ({
  updateBasicInfoValues,
  locationList,
  basicInfoData,
  clearLocationList,
  updateJobLocationValues,
  getLocationList,
  getCountryList,
  mode = 'edit',
  countryList,
}) => {
  const DEBOUNCE_DELAY = 300;
  const MIN_CHAR_TO_TRIGGER_SEARCH = 3;
  const { job_countries: jobCountries, is_remote: isRemote } = basicInfoData;
  const countryListLabelValueMap = countryList.map((country) => ({
    label: country.name,
    value: country.id,
    country_code: country.country_code,
  }));

  const [selectedSourcersData, setSelectedSourcersData] = useState(
    jobCountries.length > 0 ? jobCountries : [emptyLocationData],
  );
  const fetchDataForForm = () => {
    getCountryList({});
  };
  const helper = (countryId) => {
    const foundCountry = countryList.find((country) => country.id === countryId);
    return foundCountry?.country_code;
  };
  const [countryCode, setCountryCode] = useState([]);
  useEffect(() => {
    if (countryList?.length) {
      setCountryCode(() => jobCountries.map(
        (item, i) => ({ ind: i, countryCode: helper(item.country) }),
      ));
    }
  }, [countryList]);

  const handleSourcerInput = (key, index) => (_, selectedOption) => {
    const updatedSelectedSourcersData = cloneDeep(selectedSourcersData);
    if (key === 'country') {
      clearLocationList();
      const isRepeated = selectedSourcersData.find((item) => item.country === selectedOption.value);
      if (isRepeated) {
        return;
      }
      setCountryCode((previousState) => {
        const found = previousState.find((el) => el.ind === index);
        if (found) {
          found.countryCode = selectedOption.country_code;
          return [...previousState];
        }
        return [...previousState, { ind: index, countryCode: selectedOption.country_code }];
      });

      updatedSelectedSourcersData[index].country = selectedOption.value;
      updatedSelectedSourcersData[index].locations = [];
    }
    if (key === 'locations') updatedSelectedSourcersData[index].locations = selectedOption;
    setSelectedSourcersData(updatedSelectedSourcersData);
    if (updateJobLocationValues) updateJobLocationValues(updatedSelectedSourcersData);
  };

  const addSourcerRow = () => {
    setSelectedSourcersData([...selectedSourcersData, cloneDeep(emptyLocationData)]);
  };

  const removeSourcerRow = (index) => {
    setCountryCode(countryCode.filter((item) => item.ind !== index).map((item, i) => ({
      ind: i, countryCode: item.countryCode,
    })));

    const sourcersDataCopy = cloneDeep(selectedSourcersData);
    if (index === 0 && sourcersDataCopy.length === 1) {
      setSelectedSourcersData([cloneDeep(emptyLocationData)]);
      if (updateJobLocationValues) updateJobLocationValues([]);
      return;
    }
    sourcersDataCopy.splice(index, 1);
    setSelectedSourcersData([...sourcersDataCopy]);
    if (updateJobLocationValues) updateJobLocationValues([...sourcersDataCopy]);
  };

  const debounceFunc = debounce((value, fieldType, indexInArray) => {
    if (fieldType === 'location') {
      getLocationList({
        query: value, field: fieldType, countryCode: countryCode[indexInArray].countryCode,
      });
      updateBasicInfoValues('searchLocation')(value, null, indexInArray);
    }
  }, DEBOUNCE_DELAY);

  const fetchLocationOnKeyPress = (event, indexInArray) => {
    if (event?.target.value.length === 1) {
      clearLocationList();
    }
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'location', indexInArray);
    }
  };
  useEffect(() => {
    fetchDataForForm();
    setSelectedSourcersData(jobCountries.length ? jobCountries : [emptyLocationData]);
  }, [jobCountries.length]);
  return (
    (<S.Container>
      {selectedSourcersData.length > 0 ? selectedSourcersData.map(
        (_sourcerData, index) => (<S.CustomDropdown key={`sourcer-modify-${index}`}>
          <div>
            <S.Header>
              {index === 0 ? <S.DropdownTitle>Job Location(s)</S.DropdownTitle>
                : <S.EmptyTitleFill />}
              {index === 0 ? <S.PromptCheckBoxLabel>
                <input
                  type='checkbox'
                  disabled={mode === 'view'}
                  checked={isRemote || false}
                  onChange={updateBasicInfoValues('is_remote')}
                /> Remote
              </S.PromptCheckBoxLabel> : null}
            </S.Header>
            <S.DropdownWrapper>
              <DropDown
                className="dropdown"
                placeholder={'Select Country'}
                options={countryListLabelValueMap}
                isDisabled={mode === 'view'}
                onOptionSelect={handleSourcerInput('country', index)}
                selected={countryListLabelValueMap.find(
                  (country) => country.value === jobCountries[index]?.country,
                )}
                isSearchable={true}
                required={true}
              />
            </S.DropdownWrapper>
          </div>
          <div>
            <S.EmptyTitleFill />
            <S.SelectSourcingChannelContainer>
              <S.DropdownWrapper >
                <DropDown
                  isMultiSelect={true}
                  placeholder={'Select City(s)'}
                  options={locationList || []}
                  onOptionSelect={handleSourcerInput('locations', index)}
                  selected={
                    (jobCountries[index]?.locations?.length && countryCode[index]?.countryCode !== 'WW')
                      ? jobCountries[index].locations
                      : []
                  }
                  isSearchable={true}
                  saveDanglingQuery={true}
                  filterOptionsByQuery={false}
                  onSearchInputChange={(e) => fetchLocationOnKeyPress(e, index)}
                  isDisabled={mode === 'view' || countryCode[index]?.countryCode === 'WW' || jobCountries[index]?.country === undefined}
                  required={countryCode[index]?.countryCode !== 'WW'
                    && !isRemote}
                />

              </S.DropdownWrapper>
              {mode !== 'view' && <> <S.DeleteIconContainer >
                <img
                  src={DeleteIcon}
                  alt='Delete Job Location'
                  onClick={() => removeSourcerRow(index)}
                />
              </S.DeleteIconContainer>
                {index === selectedSourcersData.length - 1 ? <S.AddIconContainer>
                  <img
                    src={AddIcon}
                    onClick={addSourcerRow}
                    alt='Add Job Location'
                  />
                </S.AddIconContainer> : null}</>}
            </S.SelectSourcingChannelContainer>
          </div>
        </S.CustomDropdown>),
      ) : null}
    </S.Container>));
};

JobLocation.propTypes = {
  basicInfoData: PropTypes.any,
  countryList: PropTypes.any,
  GLOBAL_COUNTRY_CODE: PropTypes.any,
  countryListLabelValueMap: PropTypes.any,
  locationList: PropTypes.any,
  fetchLocationOnKeyPress: PropTypes.any,
  additionalData: PropTypes.any,
  updateBasicInfoValues: PropTypes.func,
  updateJobLocationValues: PropTypes.func,
  getLocationList: PropTypes.func,
  getCountryList: PropTypes.func,
  clearLocationList: PropTypes.func,
  readOnly: PropTypes.bool,
  mode: PropTypes.string,
};

export default JobLocation;
