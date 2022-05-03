import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import API_END_POINTS from 'src/web/ats/config/integrations';
import { getApiWithResponseObject } from 'src/config/utils';
import { RESPONSE_CODES } from 'src/config/definitions';
import { SKILL_PROFILING_MICROSERVICE_URL } from 'src/config/env';
import PropTypes from 'prop-types';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import SkillsTable from 'src/web/ats/components/jobs/common/skillsTable';
import SkillSearchBar from './skillSearchBar';
import * as S from './styles';

const emptySkillData = {
  skill: [],
  priority: true,
  relevant_experience: null,
};

const SkillProfile = ({
  roleType,
  skillProfileData,
  setSkillProfileData,
  required,
}) => {
  const [roleBasedSkillData, setRoleBasedSkillData] = useState({});
  const [selectedSkillFamily, setSelectedSkillFamily] = useState('');
  const [newSkillData, setNewSkillData] = useState(emptySkillData);
  const [isSkillsLoading, setIsSkillsLoading] = useState(true);
  const [reinitializeSkillSearchBar, setReinitializeSkillSearchBar] = useState(false);

  const { skill_areas: skillFamilyListData = [] } = roleBasedSkillData;

  const renderSkillsFamily = () => {
    if (isSkillsLoading) return <WaitingIndicator fullHeight={true} msg={''} />;

    return skillFamilyListData.map(
      (skillFamily, _) => <S.SkillFamilyName
        key={`skill_family_${_}`}
        onClick={() => setSelectedSkillFamily(skillFamily.name)}
        selected={skillFamily.name === selectedSkillFamily}
      >{skillFamily.name}</S.SkillFamilyName>,
    );
  };

  const getRoleBasedSkillData = async () => {
    const headers = {};
    const response = await getApiWithResponseObject(
      `${SKILL_PROFILING_MICROSERVICE_URL}${API_END_POINTS.getSkillProfilingData(roleType)}`,
      headers,
      { errorMessage: 'Unable to fetch skill details' },
    );
    if (response) {
      if (response.status === RESPONSE_CODES.OK) {
        setRoleBasedSkillData(response.data || {});
      }
      setIsSkillsLoading(false);
    }
  };

  useEffect(() => {
    getRoleBasedSkillData('backend_developer');
  }, []);

  const getSkillsListOnSkillFamilySelect = () => {
    if (isEmpty(skillFamilyListData)) return <S.EmptySkillName>No skill data</S.EmptySkillName>;
    const skillsList = skillFamilyListData.find(
      (_) => _.name === selectedSkillFamily,
    )?.skills || [];

    if (isEmpty(skillFamilyListData)) return <S.EmptySkillName>No skill data</S.EmptySkillName>;

    const onSelectSkillFromSkillFamily = (selectedSkill) => {
      if (newSkillData?.skill?.length
        && newSkillData?.skill.map((data) => data.name).includes(selectedSkill)) {
        return;
      }
      const updatedSkillArray = [...newSkillData.skill, { name: selectedSkill }];
      setNewSkillData({
        ...newSkillData,
        skill: updatedSkillArray,
        skill_group_id: skillProfileData.length + 1,
      });
    };

    return skillsList.map((skillName, _) => {
      const newSkillNames = newSkillData.skill.map((data) => data.name);
      return <S.SkillName
        key={`skill_name_${_}`}
        onClick={() => onSelectSkillFromSkillFamily(skillName)}
        selected={(newSkillNames || []).includes(skillName)}
      >{skillName}</S.SkillName>;
    });
  };

  const onSearchSelectSkill = (_, selectedSkills) => {
    const newSkillObjects = selectedSkills.map((data) => ({ name: data }));
    const updatedSkillArray = [...newSkillData.skill, ...newSkillObjects];
    setNewSkillData({
      ...newSkillData,
      skill: [...new Set(updatedSkillArray.map((data) => data.name))]
        .map((data) => ({ name: data })),
      skill_group_id: skillProfileData.length + 1,
    });
  };

  const onAddSkillClick = () => {
    if (isEmpty(newSkillData.skill)) return;
    setSkillProfileData([...skillProfileData, newSkillData]);
    setNewSkillData(emptySkillData);
    setReinitializeSkillSearchBar(true);
  };

  useEffect(() => {
    if (reinitializeSkillSearchBar) setReinitializeSkillSearchBar(false);
  }, [reinitializeSkillSearchBar]);

  const onChangeSkillProfileDetails = (key, index) => (event) => {
    const value = event?.target?.value || event;
    const updatedSkillProfileCopy = [...skillProfileData];

    if (key === 'remove_skill') {
      if (updatedSkillProfileCopy[index].skill.length === 1) {
        updatedSkillProfileCopy.splice(index, 1);
      } else {
        updatedSkillProfileCopy[index].skill.splice(value, 1);
      }
    }
    if (key === 'mandatory') updatedSkillProfileCopy[index].priority = true;
    if (key === 'optional') updatedSkillProfileCopy[index].priority = false;
    if (key === 'relevant_experience') {
      if (typeof value === 'string' && value) {
        const [_, decimalPart] = value.split('.');
        if (decimalPart && decimalPart.length > 1) return;
        updatedSkillProfileCopy[index].relevant_experience = parseFloat(value);
      } else {
        updatedSkillProfileCopy[index].relevant_experience = null;
      }
    }

    setSkillProfileData(updatedSkillProfileCopy);
  };

  return (<S.Container>
    <S.AddSkill>
      {!isEmpty(skillFamilyListData) || isSkillsLoading ? <S.SelectSkills>
        <S.SkillFamily>
          <S.SelectSkillsHeading>Skill Family(s)</S.SelectSkillsHeading>
          <S.SkillsFamilyNameList>
            {renderSkillsFamily()}
          </S.SkillsFamilyNameList>
        </S.SkillFamily>
        <S.Skills>
          <S.SelectSkillsHeading>Skill(s)</S.SelectSkillsHeading>
          <S.SkillsList>
            {getSkillsListOnSkillFamilySelect()}
          </S.SkillsList>
        </S.Skills>
      </S.SelectSkills> : <S.EmptySelectSkillsSection />}
      <S.SearchBarContainer>
        <SkillSearchBar
          placeholder={'Type and Select Skills'}
          onOptionSelect={onSearchSelectSkill}
          triggerReinitializeState={reinitializeSkillSearchBar}
          showRequiredPrompt={required && !skillProfileData.length}
          required={required}
        />
      </S.SearchBarContainer>
      <S.ActionContainer>
        <S.AddSkillButton type={'button'} onClick={onAddSkillClick}>{`Add Skills (${newSkillData.skill.length})`}</S.AddSkillButton>
      </S.ActionContainer>
    </S.AddSkill>
    <S.SkillDetails>
      <SkillsTable
        skillProfileData={skillProfileData}
        onChangeSkillProfileDetails={onChangeSkillProfileDetails} />
    </S.SkillDetails>
  </S.Container>
  );
};

SkillProfile.propTypes = {
  roleType: PropTypes.string,
  skillProfileData: PropTypes.array,
  setSkillProfileData: PropTypes.func,
  required: PropTypes.bool,
};

export default SkillProfile;
