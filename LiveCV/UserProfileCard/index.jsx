import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'src/web/ats/components/atoms/avatar';
import LocationIcon from 'src/web/ats/assets/icons/location.svg';
import PhoneIcon from 'src/web/ats/assets/icons/phone.svg';
import EmailIcon from 'src/web/ats/assets/icons/email.svg';
import { mobileAndTabletCheck } from 'src/web/ats/utils';
import * as S from './styles';

const UserProfileCard = ({
  avatar,
  fullName,
  currentTitle,
  currentOrganization,
  email,
  phone,
  currentLocation,
  summary,
}) => (
  <S.ProfileCard>
    {!mobileAndTabletCheck() ? (
      <Fragment>
        <S.RoleSection>
          {avatar ? (
            <S.UserAvatar src={avatar} alt={fullName} />
          ) : (
            <Avatar fullName={fullName} type='live-cv' />
          )}
          <S.UserFullName>{fullName}</S.UserFullName>
          <S.UserCurrentRole title={currentTitle}>
            {currentTitle}
          </S.UserCurrentRole>
          {currentOrganization ? (
            <S.UserCurrentOrg title={currentOrganization}>
              {currentOrganization}
            </S.UserCurrentOrg>
          ) : null}
        </S.RoleSection>
        {currentLocation ? (
          <S.UserBasicDetails>
            <div>
              <S.UserEmail title={email}>
                <img src={EmailIcon} alt="" />
                <div>{email}</div>
              </S.UserEmail>
              {phone ? (
                <S.UserPhone>
                  <img src={PhoneIcon} alt="" />
                  <div>{phone}</div>
                </S.UserPhone>
              ) : null}
            </div>
            {currentLocation ? (
              <S.UserCurrentLocation title={currentLocation}>
                <img src={LocationIcon} alt="" />
                <div>{currentLocation}</div>
              </S.UserCurrentLocation>
            ) : null}
            {/* <S.UserReport>
            <div>Download Report</div>
          </S.UserReport> */}
          </S.UserBasicDetails>
        ) : null}
      </Fragment>
    ) : (
      <Fragment>
        <S.RoleSection>
          <S.RoleSubSection>
            {avatar ? (
              <S.UserAvatar src={avatar} alt={fullName} />
            ) : (
              <Avatar fullName={fullName} diameter={72} />
            )}
            <S.RoleBasicDetails>
              <S.UserFullName>{fullName}</S.UserFullName>
              <S.UserCurrentRole title={currentTitle}>
                {currentTitle}
              </S.UserCurrentRole>
              {currentOrganization ? (
                <S.UserCurrentOrg title={currentOrganization}>
                  {currentOrganization}
                </S.UserCurrentOrg>
              ) : null}
            </S.RoleBasicDetails>
          </S.RoleSubSection>
        </S.RoleSection>
        {currentLocation ? (
          <S.UserBasicDetails>
            <S.UserBasicDetailsSubContainer>
              <div>
                <S.UserEmail title={email}>
                  <img src={EmailIcon} alt="" />
                  <div>{email}</div>
                </S.UserEmail>
                {phone ? (
                  <S.UserPhone>
                    <img src={PhoneIcon} alt="" />
                    <div>{phone}</div>
                  </S.UserPhone>
                ) : null}
              </div>
              {currentLocation ? (
                <S.UserCurrentLocation>
                  <img src={LocationIcon} alt="" />
                  <div>{currentLocation}</div>
                </S.UserCurrentLocation>
              ) : null}
            </S.UserBasicDetailsSubContainer>
          </S.UserBasicDetails>
        ) : null}
        {summary ? <S.UserSummary>{summary}</S.UserSummary> : null}
      </Fragment>
    )}
  </S.ProfileCard>
);

UserProfileCard.propTypes = {
  avatar: PropTypes.string,
  fullName: PropTypes.string,
  currentTitle: PropTypes.string,
  currentOrganization: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  currentLocation: PropTypes.string,
  summary: PropTypes.string,
};

export default UserProfileCard;
