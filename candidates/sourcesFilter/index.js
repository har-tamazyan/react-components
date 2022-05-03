import React, {
  useEffect, useMemo, useRef, useState,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import * as S from './styles';

const emptyBasicInfo = {
  source: [],
  sourcer: [],
};

const SourcesFilter = ({
  searchAggregates,
  onApplySource,
  onApplySourcer,
  closeModal,
}) => {
  const refOfOuterBlockSource = useRef();
  const [candidateSourceList, setCandidateSourceList] = useState([]);
  const [candidateSourcerList, setCandidateSourcerList] = useState([]);
  const [basicInfoData, setBasicInfoData] = useState({ ...emptyBasicInfo });
  const [dropdownOpenCount, setDropdownOpenCount] = useState(0);

  useEffect(() => {
    const sourceList = (searchAggregates?.source ?? []).map((item) => ({
      label: item.key ?? '',
      value: item.key ?? '',
      selected: item.selected ?? false,
    }));
    const sourcerList = (searchAggregates?.sourcer ?? []).map((item) => ({
      label: item.key ?? '',
      value: item.key ?? '',
      selected: item.selected ?? false,
    }));
    setCandidateSourceList(sourceList);
    setCandidateSourcerList(sourcerList);
    setBasicInfoData({
      ...basicInfoData,
      ...({ source: sourceList.filter((item) => item.selected) ?? [] }),
      ...({ sourcer: sourcerList.filter((item) => item.selected) ?? [] }),
    });
  }, [searchAggregates]);


  const selectedSource = useMemo(() => (
    candidateSourceList.filter((_) => (basicInfoData.source ?? [])
      .map((item) => item.value)
      .includes(_.value))
  ), [basicInfoData.source, candidateSourceList]);

  const selectedSourcer = useMemo(() => (
    candidateSourcerList.filter((_) => (basicInfoData.sourcer ?? [])
      .map((item) => item.value)
      .includes(_.value))
  ), [basicInfoData.sourcer, candidateSourcerList]);

  const updateValues = (key) => (event, selectedOption = null, type = '') => {
    let value = event.target ? event.target.value : event;
    if (key === 'source') {
      value = selectedOption;
    }
    if (key === 'sourcer') {
      value = selectedOption;
    }
    setBasicInfoData({
      ...basicInfoData,
      [key]: (type === 'remove' ? selectedOption : value).map((item) => ({ ...item, selected: true })),
    });
    setDropdownOpenCount(0);
  };

  const removeSources = (key, index) => () => {
    setBasicInfoData({
      ...basicInfoData,
      [key]: (basicInfoData[key] ?? [])
        .filter((__, itemIndex) => itemIndex !== index),
    });
  };

  const applySourcesAndSourcer = () => {
    const source = (basicInfoData?.source ?? []).map((item) => ({
      id: 'source',
      key: item.value,
      selected: true,
    }));

    const sourcer = (basicInfoData?.sourcer ?? []).map((item) => ({
      id: 'sourcer',
      key: item.value,
      selected: true,
    }));
    if (source)onApplySource(source);
    if (sourcer) onApplySourcer(sourcer);

    closeModal();
  };

  const handleDropdownOpenCount = (value) => () => {
    setDropdownOpenCount(value);
  };

  const validSourceAndSourcer = (basicInfoData.source ?? []).length === 0
    && (basicInfoData.sourcer ?? []).length === 0;

  return (
    <S.Card>
      <S.ModalTitle>Select Sourcer & Source</S.ModalTitle>
      <S.SourceMix>
        <S.CustomDropdown
          onClick={handleDropdownOpenCount(1)}
          ref={refOfOuterBlockSource}
        >
          <DropDown
            isMultiSelect
            options={candidateSourcerList}
            placeholder={'Select Sourcer'}
            onOptionSelect={updateValues('sourcer')}
            selected={selectedSourcer}
          />
        </S.CustomDropdown>
        <S.CustomDropdown
          onClick={handleDropdownOpenCount(1)}
          ref={refOfOuterBlockSource}
        >
          <DropDown
            isMultiSelect
            options={candidateSourceList}
            placeholder={'Select Source'}
            onOptionSelect={updateValues('source')}
            selected={selectedSource}
          />
        </S.CustomDropdown>

        <S.SelectedSource dropdownOpenCount={dropdownOpenCount}>
          <S.SelectedSourceTitle>Selected Sourcer & Source</S.SelectedSourceTitle>
          <S.SelectedSourceList>
            {(basicInfoData.source ?? []).map((item, index) => (
              <S.SelectedSourceItem key={index}>
                <span>{item.value}</span>
                <S.RemoveSource onClick={removeSources('source', index)}>&times;</S.RemoveSource>
              </S.SelectedSourceItem>
            ))}
            {(basicInfoData.sourcer ?? []).map((item, index) => (
              <Fragment key={index}>
                <S.SelectedSourceItem>
                  <span>{item.value}</span>
                  <S.RemoveSource onClick={removeSources('sourcer', index)}>&times;</S.RemoveSource>
                </S.SelectedSourceItem>
              </Fragment>
            ))}
            { validSourceAndSourcer ? (
              <S.NoSourceSelected>No Sourcer & Source Selected</S.NoSourceSelected>
            ) : null }
          </S.SelectedSourceList>
        </S.SelectedSource>
      </S.SourceMix>

      <S.Actions>
        <S.CTA
          onClick={
            () => (
              ((basicInfoData.source ?? []).length !== 0
                || (basicInfoData.sourcer ?? []).length !== 0)
                ? applySourcesAndSourcer() : {})}
          disabled={validSourceAndSourcer}
        >
          Apply now
        </S.CTA>
      </S.Actions>
    </S.Card>
  );
};

SourcesFilter.propTypes = {
  searchAggregates: PropTypes.object,
  candidateSourcerList: PropTypes.array,
  onApplySource: PropTypes.func,
  onApplySourcer: PropTypes.func,
  closeModal: PropTypes.func,
};

export default SourcesFilter;
