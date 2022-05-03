import React, {
  useEffect, useMemo, useRef, useState,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import * as S from './styles';

const emptyBasicInfo = {
  recruiter: [],
};

const RecruiterFilter = ({
  searchAggregates,
  onApplyRecruiter,
  closeModal,
}) => {
  const refOfOuterBlock = useRef();
  const [candidateRecruiterList, setCandidateRecruiterList] = useState([]);
  const [basicInfoData, setBasicInfoData] = useState({ ...emptyBasicInfo });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const recruiterList = (searchAggregates?.recruiter ?? []).map((item) => ({
      label: item.key ?? '',
      value: item.key ?? '',
      selected: item.selected ?? false,
    }));
    setCandidateRecruiterList(recruiterList);
    setBasicInfoData({
      ...basicInfoData,
      ...({ recruiter: recruiterList.filter((item) => item.selected) ?? [] }),
    });
  }, [searchAggregates]);


  const selectedRecruiter = useMemo(() => (
    candidateRecruiterList.filter((_) => (basicInfoData.recruiter ?? [])
      .map((item) => item.value)
      .includes(_.value))
  ), [basicInfoData.recruiter, candidateRecruiterList]);

  const updateValues = (key) => (event, selectedOption = null, type = '') => {
    let value = event.target ? event.target.value : event;
    if (key === 'recruiter') {
      value = selectedOption;
    }
    setBasicInfoData({
      ...basicInfoData,
      [key]: (type === 'remove' ? selectedOption : value).map((item) => ({ ...item, selected: true })),
    });
    setDropdownOpen(!dropdownOpen);
  };

  const removeRecruiter = (key, index) => () => {
    setBasicInfoData({
      ...basicInfoData,
      [key]: (basicInfoData[key] ?? [])
        .filter((__, itemIndex) => itemIndex !== index),
    });
  };

  const applyRecruiter = () => {
    const recruiter = (basicInfoData?.recruiter ?? []).map((item) => ({
      id: 'recruiter',
      key: item.value,
      selected: true,
    }));

    if (recruiter) onApplyRecruiter(recruiter);

    closeModal();
  };

  const handleDropdownOpen = (e) => {
    e.persist();
    setDropdownOpen(!dropdownOpen);
  };

  const validRecruiter = (basicInfoData.recruiter ?? []).length === 0;

  return (
      <S.Card>
        <S.ModalTitle>Select Recruiter</S.ModalTitle>
        <S.SourceMix>
          <S.CustomDropdown
            onClick={handleDropdownOpen}
            ref={refOfOuterBlock}
          >
            <DropDown
              isMultiSelect
              options={candidateRecruiterList}
              placeholder={'Select Recruiter'}
              onOptionSelect={updateValues('recruiter')}
              selected={selectedRecruiter}
            />
          </S.CustomDropdown>
          <S.SelectedSource dropdownOpen={dropdownOpen}>
            <S.SelectedSourceTitle>Selected Recruiter</S.SelectedSourceTitle>
            <S.SelectedSourceList>
              {(basicInfoData.recruiter ?? []).map((item, index) => (
                <Fragment key={index}>
                  <S.SelectedSourceItem>
                    <span>{item.value}</span>
                    <S.RemoveSource onClick={removeRecruiter('recruiter', index)}>&times;</S.RemoveSource>
                  </S.SelectedSourceItem>
                </Fragment>
              ))}
              { validRecruiter ? (
                <S.NoSourceSelected>No Recruiter Selected</S.NoSourceSelected>
              ) : null }
            </S.SelectedSourceList>
          </S.SelectedSource>
        </S.SourceMix>

        <S.Actions>
          <S.CTA
            onClick={
              () => (
                ((basicInfoData.recruiter ?? []).length !== 0)
                  ? applyRecruiter() : {})}
            disabled={validRecruiter}
          >
            Apply now
          </S.CTA>
        </S.Actions>
      </S.Card>
  );
};

RecruiterFilter.propTypes = {
  searchAggregates: PropTypes.object,
  candidateRecruiterList: PropTypes.array,
  onApplyRecruiter: PropTypes.func,
  closeModal: PropTypes.func,
};

export default RecruiterFilter;

