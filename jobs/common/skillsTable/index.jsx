import React from 'react';
import PropTypes from 'prop-types';
import Input from 'src/web/ats/components/atoms/input';

import * as S from './styles';

const SkillsTable = ({ skillProfileData, onChangeSkillProfileDetails, readOnly }) => {
  const updateSkillProfileDetails = readOnly ? () => () => { } : onChangeSkillProfileDetails;
  // eslint-disable-next-line react/prop-types
  const SelectedSkillItem = ({ name, rowIndex, itemIndex }) => (
    <S.SelectedSkillItemContainer>
      <div>{name}</div>
      <span onClick={() => updateSkillProfileDetails('remove_skill', rowIndex)(itemIndex)}>&#215;</span>
    </S.SelectedSkillItemContainer>
  );

  const renderSelectedSkills = (skill, rowIndex) => skill.map(({ name }, index) => (
    <React.Fragment key={index} >
      <SelectedSkillItem name={name} rowIndex={rowIndex} itemIndex={index} />
      {index !== skill.length - 1
        ? <S.SeparatorTextWrapper>Or</S.SeparatorTextWrapper>
        : null}
    </React.Fragment>));

  return (<S.Container>
    <S.Header>
      <S.Heading alignment={'left'}>Skills</S.Heading>
      <S.Heading>Mandatory</S.Heading>
      <S.Heading>Optional</S.Heading>
      <S.Heading>Years of experience</S.Heading>
    </S.Header>
    <S.RowContainer>
      {skillProfileData.length > 0
        ? skillProfileData.map((skillDetails, index) => (<S.Row key={index}>
          <S.RowSelectedSkills>
            {renderSelectedSkills(skillDetails.skill, index)}
          </S.RowSelectedSkills>
          <S.PriorityRadioTypeSelector>
            <S.RadioCircle onClick={updateSkillProfileDetails('mandatory', index)}>
              {skillDetails.priority
                ? <S.RadioCircleDot />
                : null}
            </S.RadioCircle>
          </S.PriorityRadioTypeSelector>
          <S.PriorityRadioTypeSelector>
            <S.RadioCircle onClick={updateSkillProfileDetails('optional', index)}>
              {!skillDetails.priority
                ? <S.RadioCircleDot />
                : null}
            </S.RadioCircle>
          </S.PriorityRadioTypeSelector>
          <Input
            type='number'
            placeholder={''}
            onChange={updateSkillProfileDetails('relevant_experience', index)}
            min={0}
            step={'any'}
            fontSize={12}
            inputContainerStyles={{ width: 60, margin: 'auto' }}
            inputStyles={S.InputStyles}
            value={skillDetails.relevant_experience ? skillDetails.relevant_experience.toString() : ''}
            required={true}
            showRequiredDot={false}
          />
        </S.Row>)) : <S.EmptyRow>No data available</S.EmptyRow>}
    </S.RowContainer>
  </S.Container>
  );
};

SkillsTable.defaultProps = {
  skillProfileData: [],
  onChangeSkillProfileDetails: () => () => { },
  readOnly: false,
};

SkillsTable.propTypes = {
  skillProfileData: PropTypes.array,
  onChangeSkillProfileDetails: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default SkillsTable;
