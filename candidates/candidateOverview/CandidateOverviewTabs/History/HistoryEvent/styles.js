import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const EventContainer = styled.div`
  ${FLEX('flex-start')};  
  position: relative;
  padding: 24px 20px;
  max-width: 95%;
  min-height: 80px;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme.ALTO};
  box-shadow: 1px 2px 9px ${(p) => p.theme.BLACK_RGB_8};
  background: ${(p) => p.theme.WHITE};

  ${(p) => p.isUndoneOrSkipped && css`
    background: ${p.theme.WILD_SAND};
  `};
  ${(p) => p.isPreCanvas && css`
    background: ${p.theme.WHISPER};
  `};


  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const VerticalBar = styled.div`
  width: 3px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 3px;
  opacity: 0.5;
`;

export const MiniVerticalBar = styled(VerticalBar)`
  height: 55px;
`;

export const EventContent = styled.div`
  padding: 0 10px;
`;

export const UndoneBy = styled.div`
  margin-top: 12px; 
  font-style: italic;
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.PRIMARY_COLOR};
`;

export const SkippedBy = styled(UndoneBy)``;

export const JobTitle = styled.span`
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.MATISSE};
  cursor: pointer;
`;

export const EventTitle = styled.div`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.WATERLOO};
  text-transform: capitalize;
`;

export const EventActionDetails = styled.div`
  font-size: ${(p) => p.theme.X_SMALL};
  color: ${(p) => p.theme.WATERLOO};

  div {
    display: inline-block;
    font-size: ${(p) => p.theme.SMALL};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }
`;

export const ScheduledList = styled.div``;

export const ScheduledItem = styled.div`
  ${FLEX('flex-start')}; 
  margin: 10px 0;
  padding: 0 10px;
`;

export const ScheduledItemDetails = styled.div`
  padding-left: 10px;
`;

export const ScheduledText = styled(EventTitle)`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  text-transform: capitalize;
  div {
    display: inline-block;
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }
`;

export const ScheduledDateAndTime = styled.div`
  ${FLEX('center')};
`;

export const ScheduledDate = styled.div`
  margin-top: 2px;
  ${FLEX('center')};
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${(p) => p.theme.WHISPER};

  > img {
    margin-right: 6px;
  };

  > div {
    font-size: ${(p) => p.theme.SMALL};
    color: ${(p) => p.theme.RIVER_BED};
  };
`;

export const ScheduledTime = styled(ScheduledDate)`
  margin-left: 8px;
`;

export const ScheduledActionDetails = styled(EventActionDetails)``;

export const ChangeScheduleButton = styled.button`
  width: 60px;
  padding: 5px;
  background-color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.JELLY_BEAN};
`;

export const Actions = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  ${FLEX('center')};
  border-radius: 0 0 6px 0;
  z-index: 0;
  box-shadow: -1px -1px 4px 0 ${(p) => p.theme.BLACK_RGB_16};
  background-color: ${(p) => p.theme.WHITE};
`;

export const ActionsShadowAndWidth = styled.div`
  border-radius: 0 0 6px 0;
  position: absolute;
  bottom: -1px;
  right: -1px;
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 4px 0 0 4px;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  border-right-color: ${(p) => p.theme.WHITE};
  border-bottom-color: ${(p) => p.theme.WHITE};
  z-index: -1;
`;

export const UndoStage = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  ${FLEX('flex-start')};
  color: ${(p) => p.theme.MATISSE};
  border-radius: ${(p) => (p.isFeedback ? 0 : '0 0 6px 0')};

  &:hover {
    background-color: ${(p) => p.theme.MATISSE}40;
  };

  &:active {
    transform: scale(0.975);
    background-color: ${(p) => p.theme.MATISSE}26;
  }

  > img {
    width: 16px;
    margin-right: 5px;
  }

  > div {
    font-weight: ${(p) => p.theme.BOLD_FONT};
  }
`;

export const OverrideStage = styled(UndoStage)``;

export const VerticalSeparator = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${(p) => p.theme.BLACK_RGB_16};
`;

export const ViewFeedback = styled(UndoStage)`
  color: ${(p) => p.theme.BRICK_RED};
  border-radius: 0 0 6px 0;

  &:hover {
    background-color: ${(p) => p.theme.BRICK_RED}40;
  };

  &:active {
    background-color: ${(p) => p.theme.BRICK_RED}26;
  };
`;
