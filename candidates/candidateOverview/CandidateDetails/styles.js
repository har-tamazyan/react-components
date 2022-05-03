import styled, { css } from 'styled-components';
import { FLEX, Card } from 'src/web/ats/components/common/styles';

const CommonFontStyle = css`
  padding-top: 6px;
  color: ${(p) => p.theme.SHARK};
`;

export const DetailsContainer = styled(Card)`
  margin-bottom: 12px;
  padding: 14px 18px;
  ${FLEX(null, 'space-between')};
`;

export const BasicDetails = styled.div`
  ${FLEX()};
`;

export const PremiumIndicator = styled.div`
  padding: 3px 12px 0 0;
  ${FLEX('flex-start')};
`;

export const Fullname = styled.h4`
  color: ${(p) => p.theme.BRICK_RED};
  font-size: ${(p) => p.theme.XXX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  text-transform: capitalize;
`;

export const DetailActions = styled.div`
  ${FLEX('center')};
  padding-left: 15px;
`;

export const MailCandidateIcon = styled.a`
  position: relative;
  width: 24px;
  height: 21px;
  background-color: transparent;
  cursor: pointer;
  margin: 0 10px;

  svg {
    fill: ${(p) => p.theme.WATERLOO};
  };

  :target, :active, :focus, :hover {
    transform: scale(1.01);

    svg {
      fill: ${(p) => p.theme.BRICK_RED};
    }
  }
`;

export const JobReassignIcon = styled.button`
  position: relative;
  width: 24px;
  height: 21px;
  background-color: transparent;
  cursor: pointer;

  svg {
    fill: ${(p) => p.theme.WATERLOO};
  };

  :target, :active, :focus, :hover {
    transform: scale(1.01);

    svg {
      fill: ${(p) => p.theme.BRICK_RED};
    }
  }
`;

export const CurrentRole = styled.p`
  ${CommonFontStyle};
`;

export const CurrentOrganization = styled.p`
  ${CommonFontStyle};
`;
