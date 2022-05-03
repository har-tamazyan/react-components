import styled from 'styled-components';
import { TRUNCATE_TEXT } from '../../common/styles';

export const ProfileCard = styled.div`
  /* position: sticky;
  top: 32px; */
  box-shadow: 0px 3px 6px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: 8px;
  height: max-content;
  overflow: hidden;

  ${(p) => p.theme.TABLET`
    box-shadow: 0px 3px 6px ${p.theme.BLACK_RGB_16}, 0 0 0 0.4px ${p.theme.YELLOW_SEA};
  `};
`;

export const RoleSection = styled.div`
  padding: 32px 36px 24px;
  background-color: ${(p) => p.theme.YELLOW_SEA};
  text-align: center;
  color: ${(p) => p.theme.WHITE};

  ${(p) => p.theme.TABLET`
    padding: 48px 24px 0;
    text-align: unset;
    color: ${p.theme.MINE_SHAFT};
  `};
`;

export const RoleSubSection = styled.div`
  padding: 24px 16px;
  display: flex;
  align-items: center;
  text-align: unset;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 8px 8px 0 0;
  box-shadow: 0px 3px 6px ${(p) => p.theme.BOX_SHADOW};
`;

export const RoleBasicDetails = styled.div`
  padding-left: 12px;
`;

export const UserAvatar = styled.img`
  width: 90px;
  height: 90px;
  border: 3px solid ${(p) => p.theme.WHITE};
  border-radius: 50%;

  ${(p) => p.theme.TABLET`
    width: 84px;
    height: 84px;
    border-width: 2px;
  `};
`;

export const UserFullName = styled.div`
  padding-top: 12px;
  font-size: ${(p) => p.theme.XX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};

  ${(p) => p.theme.TABLET`
    padding-top: unset;
    font-size: ${p.theme.LARGE};
  `};
`;

export const UserCurrentRole = styled.div`
  padding-top: 8px;
  font-size: ${(p) => p.theme.LARGE};

  ${(p) => p.theme.TABLET`
    font-size: ${p.theme.MEDIUM};
  `};
`;

export const UserCurrentOrg = styled.div`
  padding-top: 8px;
  font-size: ${(p) => p.theme.LARGE};

  ${(p) => p.theme.TABLET`
    font-size: ${p.theme.MEDIUM};
  `};
`;

export const UserBasicDetails = styled.div`
  padding: 4px 16px 18px;
  background-color: ${(p) => p.theme.WHITE};

  ${(p) => p.theme.TABLET`
    padding: 0 24px 32px;
    box-shadow: 0 -0.6px 0 0 ${p.theme.YELLOW_SEA};
  `};
`;

export const UserBasicDetailsSubContainer = styled.div`
  padding: 24px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 3px 6px ${(p) => p.theme.BOX_SHADOW};

  ${(p) => p.theme.TABLET`
    padding: 16px 24px;
  `};
`;

export const UserSummary = styled.div`
  padding: 0 24px 24px;
  background-color: ${(p) => p.theme.WHITE};
  line-height: 1.5;
  color: ${(p) => p.theme.MINE_SHAFT};
`;

export const UserEmail = styled.div`
  padding-top: 12px;
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.BLACK}80;

  > div {
    padding-left: 16px;
    ${TRUNCATE_TEXT()};
  }

  > img {
    width: 14px;
  }
`;

export const UserPhone = styled(UserEmail)`
  padding-top: 16px;
`;

export const UserCurrentLocation = styled(UserEmail)`
  padding-top: 16px;
  ${TRUNCATE_TEXT()};
`;

export const UserReport = styled.div`
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid ${(p) => p.theme.BLACK_RGB_8};

  > div {
    cursor: pointer;
    border-radius: 20px;
    height: 40px;
    background-color: ${(p) => p.theme.YELLOW_SEA};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(p) => p.theme.LARGE};
    color: ${(p) => p.theme.WHITE};
    font-weight: ${(p) => p.theme.BOLD_FONT};
  }
`;
