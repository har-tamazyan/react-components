import { has, groupBy } from 'lodash';

export const QUESTION_TYPE = {
  allQuestions: {
    name: 'All Questions',
    key: 'allQuestions',
    order: 1,
  },
  skills: {
    name: 'Skills',
    type: 'skill',
    key: 'skills',
    order: 2,
  },
  roles: {
    name: 'Roles',
    type: 'role',
    key: 'roles',
    order: 3,
  },
  general: {
    name: 'General',
    type: 'general',
    key: 'general',
    order: 4,
  },
};

export function customGroupBy(questionListings, property) {
  const filterQuestionListingWhichHasProperty = questionListings.filter((__) => has(__, property));
  return groupBy(filterQuestionListingWhichHasProperty, property);
}
