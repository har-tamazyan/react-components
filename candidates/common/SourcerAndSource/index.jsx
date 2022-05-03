import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import UseCandidateSourcesForm from './services';
import * as S from './styles';

const SourcerAndSource = ({
  jobId,
  additionalSourcerOptions = [],
  selectedSourcer,
  selectedSource,
  updateValues,
  disableAll,
  required,
  isApiCallNeeded = true,
}) => {
  const [sourcingData, setSourcingData] = useState({
    sourcer_options: [],
    disable_sourcer_input: false,
    source_options: [],
    disable_source_input: false,
  });
  const {
    getCandidateSourcer,
    getCandidateSource,
  } = UseCandidateSourcesForm();

  const getCandidatesSources = async () => {
    const [sourcerResponse, sourceResponse] = await Promise.all([
      getCandidateSourcer(jobId),
      getCandidateSource(jobId),
    ]);

    setSourcingData({
      sourcer_options: sourcerResponse.data || [],
      disable_sourcer_input: !sourcerResponse.editable || false,
      source_options: sourceResponse.data,
      disable_source_input: !sourceResponse.editable || false,
    });
  };

  const convertOptionsToLabelValueMap = (options) => (options.map((_) => ({
    label: `${_.name}${_.email ? ` | ${_.email}` : ''}`,
    value: _.email || _.name,
  })));
  const sourcerOptionsLabelValueMap = convertOptionsToLabelValueMap([
    ...sourcingData.sourcer_options,
    ...additionalSourcerOptions
      .filter(
        (_) => (!sourcingData.sourcer_options.find(
          (__) => (_.email && __.email === _.email) || __.name === _.name,
        )),
      ),
  ]);

  useEffect(() => {
    if (jobId && isApiCallNeeded) getCandidatesSources();
  }, [jobId, isApiCallNeeded]);

  return (
    <S.SourceMix>
      <S.DropdownContainer>
        <S.DropdownTitle>Sourcer</S.DropdownTitle>
        <DropDown
          options={sourcerOptionsLabelValueMap}
          placeholder={!disableAll ? 'Select Sourcer' : ''}
          onOptionSelect={(_, __) => updateValues('sourcer')(__.value)}
          selected={sourcerOptionsLabelValueMap.find((_) => _.value === selectedSourcer)}
          isDisabled={disableAll || sourcingData.disable_sourcer_input}
          required={required}
        />
      </S.DropdownContainer>
      <S.DropdownContainer>
        <S.DropdownTitle>Source</S.DropdownTitle>
        <DropDown
          options={sourcingData.source_options}
          placeholder={!disableAll ? 'Select Source' : ''}
          onOptionSelect={(_, __) => updateValues('source')(__)}
          selected={selectedSource}
          isDisabled={disableAll || sourcingData.disable_source_input}
          required={required}
        />
      </S.DropdownContainer>
    </S.SourceMix>
  );
};

SourcerAndSource.propTypes = {
  jobId: PropTypes.number,
  disableAll: PropTypes.bool,
  additionalSourcerOptions: PropTypes.array,
  updateValues: PropTypes.func,
  selectedSourcer: PropTypes.string,
  selectedSource: PropTypes.string,
  required: PropTypes.bool,
  isApiCallNeeded: PropTypes.bool,
};

export default SourcerAndSource;
