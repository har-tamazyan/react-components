import React, { Fragment, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';
import { MenuDropdownItem } from './styles';

const JobCountries = ({ value, isRemote }) => {
  const WORLDWIDE_CODE = 'WW';

  const [displayHoverMenu, setDisplayHoverMenu] = useState(false);
  const [displayClickMenu, setDisplayClickMenu] = useState(false);

  const handleMenuDisplay = (e) => {
    e.preventDefault();
    setDisplayClickMenu(!displayClickMenu);
  };

  const locationList = useMemo(() => (value ?? []).reduce((accum, country) => {
    const locationIsWorldWide = country.code === WORLDWIDE_CODE;
    if (locationIsWorldWide) return [...accum, country.name];

    const emptyLocation = !(country.locations ?? []).length;
    if (emptyLocation) return [...accum, `${country.name}`];

    const countryLocations = country.locations.map((location) => `${location.city}, ${country.code}`);
    return [...accum, ...countryLocations];
  }, []).filter((item) => item), [value]);

  const moreThanOneCountry = useMemo(() => locationList.length > 1, [locationList]);

  return (
    <S.JobCountryContainer>
      <S.JobCountryInnerWrapper>
        <div>
          {locationList.map((name, index) => (
            <Fragment key={index}>
              {index === 0 ? (
                <S.JobCountry>
                  <MenuDropdownItem>
                    {name}
                  </MenuDropdownItem>
                </S.JobCountry>
              ) : null}
            </Fragment>
          ))}
          <br />
          {isRemote ? <S.RemoteBadge>Remote</S.RemoteBadge> : null}
        </div>
        <S.MoreMenuContainer
          onMouseLeave={() => setDisplayHoverMenu(false)}
          onMouseEnter={() => setDisplayHoverMenu(true)}>
          {moreThanOneCountry ? <S.JobCountryMoreLink
            href={''}
            onClick={handleMenuDisplay}>
            +{locationList.length - 1}
          </S.JobCountryMoreLink> : null}
          {displayHoverMenu || displayClickMenu ? (
            <S.MenuDropdownContainer>
              <S.DropDownWrapper>
                {locationList.map((name, index) => {
                  if (index === 0) return null;
                  return (
                    <Fragment key={index}>
                      <MenuDropdownItem>
                        {name}
                      </MenuDropdownItem>
                    </Fragment>
                  );
                })}
              </S.DropDownWrapper>
            </S.MenuDropdownContainer>
          ) : null}
        </S.MoreMenuContainer>
      </S.JobCountryInnerWrapper>
    </S.JobCountryContainer>
  );
};

JobCountries.propTypes = {
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.shape({
      city: PropTypes.string,
    })),
  })),
  isRemote: PropTypes.bool,
};

export default JobCountries;
