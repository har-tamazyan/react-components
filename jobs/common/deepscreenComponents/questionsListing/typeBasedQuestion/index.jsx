import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { flatMapDeep } from 'lodash';
import * as S from './styles';
import { QUESTION_TYPE, customGroupBy } from '../utils';

const TypeBasedQuestion = ({
  screeningQuestions = [],
  handleQuestionCategory,
  isLoadingScreeningQuestions,
}) => {
  const [activeSection, setActiveSection] = useState(QUESTION_TYPE.allQuestions.name);

  const groupedQuestionsBySkills = customGroupBy(screeningQuestions, QUESTION_TYPE.skills.type);
  const groupedQuestionsByRoles = customGroupBy(screeningQuestions, QUESTION_TYPE.roles.type);
  const filteredGeneralQuestions = screeningQuestions.filter((__) => __.general);

  const totalNoOfQuestions = screeningQuestions.length;
  const totalNoOfSkillsQuestions = flatMapDeep(groupedQuestionsBySkills).length;
  const totalNoOfRolesQuestions = flatMapDeep(groupedQuestionsByRoles).length;
  const totalNoOfGeneralQuestions = filteredGeneralQuestions.length;

  const handleActiveSection = (name, type) => () => {
    setActiveSection(name);
    handleQuestionCategory(name, type);
  };

  return (
    <S.Container>
      <S.AllQuestions>
        <S.AllQuestionsHead
          isActive={activeSection === QUESTION_TYPE.allQuestions.name}
          onClick={handleActiveSection(
            QUESTION_TYPE.allQuestions.name,
            QUESTION_TYPE.allQuestions.key,
          )}
        >
          <div>{QUESTION_TYPE.allQuestions.name}</div>
          <span>{isLoadingScreeningQuestions ? '...' : totalNoOfQuestions}</span>
        </S.AllQuestionsHead>
      </S.AllQuestions>

      <S.Skills>
        <S.SkillsHead
          isActive={activeSection === QUESTION_TYPE.skills.name}
          onClick={handleActiveSection(
            QUESTION_TYPE.skills.name,
            QUESTION_TYPE.skills.key,
          )}
        >
          <div>{QUESTION_TYPE.skills.name}</div>
          <span>{isLoadingScreeningQuestions ? '...' : totalNoOfSkillsQuestions}</span>
        </S.SkillsHead>

        <S.SkillsList>
          {Object.keys(groupedQuestionsBySkills)
            .map((skill) => (
              <S.SkillsListItem
                key={skill}
                isActive={activeSection === skill}
                onClick={handleActiveSection(
                  skill,
                  QUESTION_TYPE.skills.type,
                )}
              >
                {skill}
              </S.SkillsListItem>
            ))}
        </S.SkillsList>
      </S.Skills>

      <S.Roles>
        <S.RolesHead
          isActive={activeSection === QUESTION_TYPE.roles.name}
          onClick={handleActiveSection(
            QUESTION_TYPE.roles.name,
            QUESTION_TYPE.roles.key,
          )}
        >
          <div>{QUESTION_TYPE.roles.name}</div>
          <span>{isLoadingScreeningQuestions ? '...' : totalNoOfRolesQuestions}</span>
        </S.RolesHead>

        <S.RolesList>
          {Object.keys(groupedQuestionsByRoles)
            .map((role) => (
              <S.RolesListItem
                key={role}
                isActive={activeSection === role}
                onClick={handleActiveSection(
                  role,
                  QUESTION_TYPE.roles.type,
                )}
              >
                {role}
              </S.RolesListItem>
            ))}
        </S.RolesList>
      </S.Roles>

      <S.General>
        <S.GeneralHead
          isActive={activeSection === QUESTION_TYPE.general.name}
          onClick={handleActiveSection(
            QUESTION_TYPE.general.name,
            QUESTION_TYPE.general.key,
          )}
        >
          <div>{QUESTION_TYPE.general.name}</div>
          <span>{isLoadingScreeningQuestions ? '...' : totalNoOfGeneralQuestions}</span>
        </S.GeneralHead>
      </S.General>
    </S.Container>
  );
};

TypeBasedQuestion.propTypes = {
  screeningQuestions: PropTypes.array,
  handleQuestionCategory: PropTypes.func,
  isLoadingScreeningQuestions: PropTypes.bool,
};

export default TypeBasedQuestion;
