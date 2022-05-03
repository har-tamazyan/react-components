import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { withRouter } from 'react-router-dom';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import toaster from 'src/web/ats/components/atoms/toaster';
import CustomSkillDropdown from 'src/web/ats/components/common/customSkillDropdown';

import * as S from './styles';
import Input from '../../../atoms/input';
import DropDown from '../../../atoms/dropDown';

const DEBOUNCE_DELAY = 300;
const MIN_CHAR_TO_TRIGGER_SEARCH = 3;

const RATINGS = new Array(8).fill().map((__, index) => ({
  label: `${index + 3} stars`,
  value: index + 3,
}));

const RATINGS_FOR_OVERALL_FITMENT = new Array(3).fill().map((__, index) => ({
  label: `${index + 3} stars`,
  value: index + 3,
}));

const AddParameterModal = ({
  buttonCallback,
  closeModal,
  skillsList,
  getSkillsList,
  sections,
  fitmentName,
  paramType,
}) => {
  const [parameterName, setParameterName] = useState('');
  const [maxRating, setMaxRating] = useState(null);
  const filteredSection = sections.filter((__) => __.name === fitmentName)[0];
  const { type, fitmentType } = paramType;

  const handleParameterName = (key) => (e, selectedOption) => {
    const value = key === 'skill' ? selectedOption : (e.target.value).trimStart();
    setParameterName(value);
  };

  const submitParams = () => {
    const filteredParameters = filteredSection.parameters
      .filter((__) => __.name.toLowerCase() === parameterName.toLowerCase());
    if (filteredParameters.length) {
      toaster({
        type: 'error',
        msg: `This ${type} is already present`,
        unique: true,
      });
      return false;
    }
    const parameter = {
      name: parameterName,
      value: 0,
      max_value: maxRating,
    };
    buttonCallback(parameter);
    return true;
  };

  const debounceFunc = debounce((value, fieldType) => {
    getSkillsList({ query: value, field: fieldType });
  }, DEBOUNCE_DELAY);

  const fetchSkillsOnKeyPress = (event) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'skill');
    }
  };

  return (
    <S.Container>
      <S.Title>Add new {type}</S.Title>
      <S.Description>
        Please enter the name of the {type} and the maximum rating for the {type} below
      </S.Description>

      <S.DropdownList isSkill={type === 'skill'}>
        {type === 'skill' ? (
          <S.CustomDropdown isSkill={type === 'skill'}>
            <CustomSkillDropdown
              placeholder={'Skill'}
              options={skillsList}
              onOptionSelect={handleParameterName('skill')}
              selected={parameterName}
              onSearchInputChange={fetchSkillsOnKeyPress}
              boxform={false}
            />
          </S.CustomDropdown>
        ) : (
          <Input
            label='Additional Remarks'
            placeholder={`Enter name of ${type}`}
            onChange={handleParameterName()}
            value={parameterName}
          />
        )}
        <DropDown
          options={fitmentType !== 'overallFitment' ? RATINGS : RATINGS_FOR_OVERALL_FITMENT}
          onOptionSelect={(__, selectedOption) => setMaxRating(selectedOption.value)}
          placeholder="Select max rating"
          selected={RATINGS.find((__) => __.value === maxRating) || ''}
        />
      </S.DropdownList>

      <S.Actions>
        <S.PrimaryButton
          onClick={submitParams}
          disabled={!(maxRating && parameterName)}
        >Confirm</S.PrimaryButton>
        <S.SecondaryButton onClick={closeModal}>Go Back</S.SecondaryButton>
      </S.Actions>
    </S.Container>
  );
};

AddParameterModal.propTypes = {
  buttonCallback: PropTypes.func,
  closeModal: PropTypes.func,
  skillsList: PropTypes.array,
  getSkillsList: PropTypes.func,
  paramType: PropTypes.object,
  sections: PropTypes.array,
  fitmentName: PropTypes.string,
};

const mapStateToProps = ({ session }) => ({
  skillsList: sessionSelectors.getJobSkillsList({ session }),
});

const mapDispatchToProps = {
  getSkillsList: sessionActions.getSkillsList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddParameterModal));
