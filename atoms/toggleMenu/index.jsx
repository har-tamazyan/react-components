import React, { useState } from 'react';
import ToggleMenuIcon from 'src/web/ats/assets/icons/toggle-menu.svg';
import ToggleMenuDisabledIcon from 'src/web/ats/assets/icons/toggle-menu-disabled.svg';
import PropTypes from 'prop-types';
import * as S from 'src/web/ats/components/atoms/toggleMenu/styles';
import OutsideAlerter from 'src/web/ats/components/atoms/outsideClickHandler';

const ToggleMenu = ({ Menu, list, disabled }) => {
  const [show, setShow] = useState(false);

  if (!list || !list.length) return null;
  return (
    <OutsideAlerter actionHandler={() => { setShow(false); }}>
      <S.StyledListContainer>
        <S.StyledListHeader show={show} disabled={disabled}
          onClick={() => setShow(!disabled ? !show : show)}>
          <p>{Menu}</p>
          <div><img src={!disabled ? ToggleMenuIcon : ToggleMenuDisabledIcon} /></div>
        </S.StyledListHeader>
        {
          show
            ? <S.StyledLiContainer>
              <S.StyledList>
                {
                  list.map((item, index) => (
                    <S.StyledLi
                      key={index}
                      onClick={() => { item.onClick(); setShow(false); }}
                    >
                      {item.label}
                    </S.StyledLi>
                  ))
                }
              </S.StyledList>
            </S.StyledLiContainer>
            : null
        }
      </S.StyledListContainer>
    </OutsideAlerter>
  );
};

ToggleMenu.propTypes = {
  Menu: PropTypes.string,
  disabled: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })),
};

ToggleMenu.defaultProps = {
  Menu: 'Export',
  list: [],
  disabled: false,
};

export default ToggleMenu;
