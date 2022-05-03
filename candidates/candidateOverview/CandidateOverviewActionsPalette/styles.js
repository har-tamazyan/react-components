import styled, { css } from 'styled-components';
import { CLAMP_TEXT, FLEX } from 'src/web/ats/components/common/styles';

const COMMON_STYLES = css`
  width: 150px;
  height: 30px;
  line-height: 24px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  border-radius: 15px;
  ${FLEX('center', 'center')};
`;

const CommonFontStyle = css`
  font-size: ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.SHARK};
`;

const ActionPaletteButtonThemes = {
  RED_THEME: (isPrimaryMode) => css`
                  ${COMMON_STYLES}
                  ${isPrimaryMode ? css`
                      color: ${(p) => p.theme.WHITE};
                      background: linear-gradient(180deg, ${(p) => p.theme.PRIMARY_COLOR_LIGHT} 0%, ${(p) => p.theme.PRIMARY_COLOR} 100%);
                      border: 1px solid ${(p) => p.theme.CABARET};
                  ` : css`
                      color: ${(p) => p.theme.PRIMARY_COLOR};
                      background-color: ${(p) => p.theme.WHITE};
                      border: 1px solid ${(p) => p.theme.PRIMARY_COLOR};
                  `}
                  `,
  BLUE_THEME: css`
                  height: 30px;
                  color: ${(p) => p.theme.CURIOUS_BLUE};
                  font-size: ${(p) => p.theme.SMALL};
                  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
                  `,
};

export const ActionPaletteItems = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`;

export const ActionPaletteItem = styled.div`
  width: 100%;
  max-width: calc(100%/5);
  padding: 0 10px;
  ${(p) => p.rightBorder && css`
  border-right: 1px solid ${p.theme.SILVER};
  `}
`;

export const ItemHeading = styled.div`
  color: ${(p) => p.theme.BRICK_RED};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  width: 100%;
  height: 17px;
`;

export const ItemContent = styled.div`
  width: 100%;
  height: calc(100% - 17px);
  padding: 12px 0;
`;

export const EmptyItemContentText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
`;

export const ItemContentText = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
`;

export const ItemActionBy = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const ItemActionByIcon = styled.img`
  width: 12px;
  height: 12px;
  margin: 2px 5px 0 0;
`;

export const ItemActionByName = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  word-break: break-all;
`;

export const AssigneeList = styled.div``;

export const SecondaryAssignee = styled(ItemActionBy)`
  margin: 10px 0;
`;

export const SecondaryAssigneeIcon = styled(ItemActionByIcon)``;

export const SecondaryAssigneeName = styled(ItemActionByName)``;

export const SecondaryAssigneeDisplayText = styled.div`
  ${ActionPaletteButtonThemes.BLUE_THEME};
  display: block;
  width: fit-content;
  height: 24px;
  line-height: 24px;
  margin: 0 0 0 auto;
  font-size: ${(p) => p.theme.SMALL};
`;

export const SecondaryAssigneeList = styled.div`
`;


export const CandidateActions = styled.div`
  padding: 0 32px;

  .container {
    display: flex;
    justify-content: space-between;

    .checkbox {
      display: flex;
      p{
        color: #1C1D21;
       letter-spacing: 0px
      }
    }
  }
`;


export const Checkbox = styled.span`
  width: 14px;
  height: 14px;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.DOVE_GRAY};
  border-radius: 15%;
  margin-right: 10px;
  ${FLEX('center', 'center')};

  > img {
    width: 8px;
  }
`;


export const CandidateActionsTitle = styled.div`
  display: inline-block;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;


export const ActionsAndStage = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: calc(50% - 12px) calc(50% - 12px);
  grid-gap: 24px;
`;

export const ActionsContainer = styled.div`
  padding-left: 15px;
  ${FLEX()};
`;

export const CurrentStage = styled.div`
  width: 45%;
`;

export const CurrentStageHead = styled.h4`
  color: ${(p) => p.theme.BRICK_RED};
  font-weight: ${(p) => p.theme.BOLD_FONT};

  > span {
    padding-left: 12px;
    color: ${(p) => p.theme.WATERLOO};
    font-size: ${(p) => p.theme.SMALL};
  }
`;

export const CurrentStageTitle = styled.p`
  ${CommonFontStyle};
  padding-top: 24px;
`;

export const SkipStageButton = styled.button`
  ${ActionPaletteButtonThemes.BLUE_THEME}
  height: 10px;
  font-size: ${(p) => p.theme.SMALL};
  text-decoration: underline;
`;

export const RenegotiateButton = styled(SkipStageButton)``;

export const InviteButton = styled(SkipStageButton)``;

export const ResendInviteButton = styled(SkipStageButton)``;

export const NextAction = styled.div`
  color: ${(p) => p.theme.BRICK_RED};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  ${CLAMP_TEXT(2)};
  margin-bottom: 5px;

  > span {
    color: ${(p) => p.theme.WATERLOO};
    font-size: ${(p) => p.theme.SMALL};
    font-weight: ${(p) => p.theme.REGULAR_FONT};
    text-transform: uppercase;
  }
`;

export const ActionButtonsContainer = styled.div`
  width: 55%;
`;

export const ActionButtons = styled.div`
  ${FLEX('center', 'center', 'column')};
  min-height: 90px;
`;

export const StatusContainer = styled.div`
  padding-left: 20px;
  border-left: 1px solid ${(p) => p.theme.ALTO};
`;

export const StatusHead = styled.h4`
  color: ${(p) => p.theme.BRICK_RED};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  margin-bottom: 5px;
`;

export const StatusButton = styled.button`
  ${ActionPaletteButtonThemes.RED_THEME(false)};
  ${(p) => (p.marginTop ? css`margin-top: 8px;` : css`margin: 0;`)}
`;

export const AddStatusButton = styled.button`
  display: block;
  ${ActionPaletteButtonThemes.BLUE_THEME}
  ${(p) => (p.emptyStatus
    ? css`margin: 0 auto;
          font-size: ${p.theme.MEDIUM};
           `
    : css`margin: 0 0 0 auto;
          font-size: ${p.theme.SMALL};
          `)};
`;

export const AddFeedback = styled.button`
  ${ActionPaletteButtonThemes.RED_THEME(false)};
  ${(p) => (p.marginTop ? css`margin-top: 8px;` : css`margin: 0;`)}
  &.highlited {
    ${ActionPaletteButtonThemes.RED_THEME(true)};
  }
`;

export const ViewFeedback = styled.button`
  ${ActionPaletteButtonThemes.RED_THEME(false)};
`;

export const FillMandatoryDetails = styled.button`
 ${ActionPaletteButtonThemes.RED_THEME(true)};
`;
export const ViewMandatoryDetails = styled.button`
 ${(p) => (p.marginTop ? css`margin-top: 8px;` : css`margin: 0;`)}
 ${ActionPaletteButtonThemes.RED_THEME(false)};
`;

export const DecisionActionPrimary = styled.button`
  ${ActionPaletteButtonThemes.RED_THEME(true)};
`;
export const MoveForwardReject = styled.button`
${ActionPaletteButtonThemes.RED_THEME(false)};
&.highlited {
    ${ActionPaletteButtonThemes.RED_THEME(true)};
  }
`;

export const DecisionActionSecondary = styled.button`
  ${ActionPaletteButtonThemes.RED_THEME(false)};
  margin-top: 8px;
`;

export const DecisionActionSecondaryResume = styled.button`
  ${ActionPaletteButtonThemes.RED_THEME(false)};
`;

// Utilities
export const Separator = styled.div`
  margin: 0 15px;
  border-right: 1px solid ${(p) => p.theme.ALTO};
`;

export const DropdownTitle = styled.div`
  margin-bottom: 8px;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const DropdownContainer = styled.div`
  margin-top: 20px;
`;
