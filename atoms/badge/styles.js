import styled, { css } from 'styled-components';
import { STATUS as JOB_STATUS } from 'src/constants/jobs';

/**
 * types are: SUCCESS, WARNING and DANGER
 */

const badgeColorToStatusMap = {
  SUCCESS: ['active', 'open', 'new'],
  WARNING_YELLOW: ['in_progress'],
  WARNING_ORANGE: [
    'on_hold', JOB_STATUS.DRAFT, JOB_STATUS.READY_FOR_INTAKE,
    JOB_STATUS.INTAKE_IN_PROGRESS, JOB_STATUS.READY_TO_LAUNCH,
  ],
  DANGER: ['closed'],
  GENERIC: ['Assigned'],
};

export const BadgeItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  padding: 3px 12px 2px;
  border: 1px solid currentColor;
  border-radius: 3px;
  user-select: none;
  font-size: ${(p) => p.theme.X_SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};

  ${(p) => {
    let customColor;
    let textTransformation = 'uppercase';

    if (badgeColorToStatusMap.SUCCESS.includes(p.type)) {
      customColor = p.theme.SUCCESS;
    } else if (badgeColorToStatusMap.WARNING_YELLOW.includes(p.type)) {
      customColor = p.theme.WARNING_YELLOW;
    } else if (badgeColorToStatusMap.WARNING_ORANGE.includes(p.type)) {
      customColor = p.theme.WARNING_ORANGE;
    } else if (badgeColorToStatusMap.DANGER.includes(p.type)) {
      customColor = p.theme.DANGER;
    } else if (badgeColorToStatusMap.GENERIC.includes(p.type)) {
      customColor = p.theme.RHINO;
      textTransformation = 'capitalize';
    } else {
      customColor = p.theme.DOVE_GRAY;
    }

    return css`
      color: ${customColor};
      text-transform:  ${textTransformation};

    `;
  }}
  
`;
