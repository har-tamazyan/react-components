import styled, { css } from 'styled-components';
import { FLEX, FADE_ANIMATION_IN } from 'src/web/ats/components/common/styles';
import { CUSTOM_SCROLLBAR } from '../../styles';

export const Container = styled.div`
  margin-right: 10px;
  padding-bottom: 24px;
  overflow-y: auto;
  max-height: inherit;
  border-radius: 6px;
  box-shadow: 0 0 0 1px ${(p) => p.theme.PORT_GORE_LIGHT}80;
  ${CUSTOM_SCROLLBAR};
`;

export const AllQuestions = styled.div``;

export const AllQuestionsHead = styled.div`
  position: relative;
  margin-bottom: 1px;
  padding: 8px 8px 8px 16px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => (p.isActive ? p.theme.EXTRA_BOLD_FONT_BASE : p.theme.SEMI_BOLD_FONT)};
  color: ${(p) => p.theme.PORT_GORE};
  box-shadow: 0 1px 0 0 ${(p) => p.theme.PORT_GORE_LIGHT}80;
  ${FLEX('center', 'space-between')};
  cursor: pointer;
  user-select: none;
  transition: background-color ${(p) => p.theme.VERY_FAST_TRANSIT} ease 0ms;

  &:hover {
    background-color: ${(p) => p.theme.WHISPER};
    border-radius: 6px 6px 0 0;
  }

  ${(p) => p.isActive && css`
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: -1px;
      left: 0;
      margin: 0 8px 0 16px;
      width: calc(100% - 24px);
      height: 2px;
      border-radius: 4px;
      background-color: ${p.theme.PORT_GORE};
      ${FADE_ANIMATION_IN('FAST_TRANSIT')};
    }
  `}
`;

export const Skills = styled.div``;
export const SkillsHead = styled(AllQuestionsHead)`
  &:hover {
    border-radius: unset;
  }
`;

export const Roles = styled.div``;
export const RolesHead = styled(AllQuestionsHead)`
  box-shadow: 0 -0.6px 0 0 ${(p) => p.theme.PORT_GORE_LIGHT}80,
              0 0.6px 0 0 ${(p) => p.theme.PORT_GORE_LIGHT}80;
  
  &:hover {
    border-radius: unset;
  }
`;

export const SkillsList = styled.div``;

export const SkillsListItem = styled.div`
  position: relative;
  padding: 8px 4px 8px 24px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => (p.isActive ? p.theme.BOLD_FONT : p.theme.REGULAR_FONT)};
  color: ${(p) => (p.isActive ? p.theme.PORT_GORE : p.theme.PORT_GORE_LIGHT)};
  text-transform: capitalize;
  cursor: pointer;
  user-select: none;
  word-break: break-word;
  transition: background-color ${(p) => p.theme.VERY_FAST_TRANSIT} ease 0ms;

  &:hover {
    background-color: ${(p) => p.theme.WHISPER};
  }

  ${(p) => p.isActive && css`
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      margin: 8px 0;
      width: 2px;
      height: calc(100% - 16px);
      border-radius: 4px;
      background-color: ${p.theme.PORT_GORE};
      ${FADE_ANIMATION_IN('FAST_TRANSIT')};
    }
  `}
`;

export const RolesList = styled(SkillsList)``;
export const RolesListItem = styled(SkillsListItem)``;

export const General = styled.div``;
export const GeneralHead = styled(RolesHead)``;
