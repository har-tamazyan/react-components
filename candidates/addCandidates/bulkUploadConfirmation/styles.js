import styled from 'styled-components';
import {
  FLEX,
  FADE_ANIMATION_IN,
  CUSTOM_SCROLLBAR,
} from 'src/web/ats/components/common/styles';

export const ConfirmationWrapper = styled.div`
  width: 100%;
  ${FLEX('center', 'center')};
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: ${(p) => p.theme.HEADING};
  font-weight: ${(p) => p.theme.LIGHT_FONT};
  color: ${(p) => p.theme.SHARK};
  padding-bottom: 32px;
`;

export const Actions = styled.div`
  ${FLEX('center')};
`;

export const ViewCandidate = styled.div`
  height: 44px;
  width: 240px;
  ${FLEX('center', 'center')};
  border-radius: 8px;
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.PORT_GORE};
  transition: background-color ${(p) => p.theme.FAST_TRANSIT} ease 0ms;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: ${(p) => p.theme.BLACK_RGB_4};
  }
`;

export const AddAnotherCandidate = styled(ViewCandidate)`
  margin-left: 28px;
`;

export const CandidateAddedImage = styled.div`
  margin-bottom: 32px;

  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const BulkUploadTexts = styled.div`
  font-size: ${(p) => p.theme.HEADING};
  font-weight: ${(p) => p.theme.LIGHT_FONT};
  text-align: center;

  > div {
    padding-top: 12px;
    color: ${(p) => p.theme.SHARK};

    > span {
      color: ${(p) => p.theme.HIPPIE_BLUE};
      cursor: pointer;
    }
  }

  > span {
    display: block;
    margin: auto;
    padding: 24px 0;
    font-size: ${(p) => p.theme.LARGE};
    color: ${(p) => p.theme.BRICK_RED};
  }
`;

export const OverlayContainer = styled.div`
  padding: 24px 48px 24px 32px;
  background-color: ${(p) => p.theme.WHITE};
  width: 540px;
  max-height: 480px;
  overflow-y: auto;
  border-radius: 9px;
  ${FADE_ANIMATION_IN('VERY_FAST_TRANSIT')};
  ${CUSTOM_SCROLLBAR}
`;

export const OverlayTitle = styled.div`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
`;

export const OverlayDesc = styled.div`
  padding-top: 6px;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
`;

export const ListOfFailedCandidates = styled.div`
  margin-top: 24px;
`;

export const ListItem = styled.div`
  ${FLEX('flex-start')};
  margin-bottom: 12px;

  > img {
    width: 16px;
    margin: 2px 8px 0 0;
  }

  > div {
    font-size: ${(p) => p.theme.MEDIUM};
    color: ${(p) => p.theme.WATERLOO};

    > div:nth-child(2) {
      padding-top: 2px;
      font-size: ${(p) => p.theme.SMALL};
    }
  }
`;

export const OverlayButtonContainer = styled.div`
  margin-top: 48px;
  text-align: center;
`;

export const OverlayButton = styled.button`
  padding: 8px 32px;
  border-radius: 6px;
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.WATERLOO};
`;
