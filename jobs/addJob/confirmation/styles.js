import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

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

export const ViewJob = styled.div`
  height: 44px;
  width: 240px;
  ${FLEX('center', 'center')};
  border-radius: 8px;
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.PORT_GORE};
  transition: background-color ${(p) => p.theme.FAST_TRANSIT} ease 0ms;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.BLACK_RGB_4};
  }
`;

export const AddAnotherJob = styled(ViewJob)`
  text-decoration: none;
  color: inherit;
  margin-left: 28px;
`;

export const JobAddedImage = styled.div`
  margin-bottom: 32px;

  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;
