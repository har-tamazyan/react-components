import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { protectedRoutes } from 'src/web/ats/routes';
import ConfirmIcon from 'src/web/ats/assets/icons/confirm_icon.svg';
import qs from 'qs';
import { connect } from 'react-redux';
import * as S from './styles';
import { companyActions } from '../../../../../redux/modules/company/creator';

const Confirmation = ({ location, setTabLocation, fetComapnyDetails }) => {
    const history = useHistory();
    const { id } = qs.parse(location.search, { ignoreQueryPrefix: true });

    return (
            <>
                <S.confirmImgBlock>
                    <img src={ConfirmIcon}
                        alt='confirm-Img' />
                </S.confirmImgBlock>
                <S.confirmHeading>A company has been successfully created</S.confirmHeading>
                <S.confirmBtnBlock>
                <S.confirmViewBtn onClick={() => {
                    fetComapnyDetails({ companyId: id });
                    history.push({ pathname: protectedRoutes.company('clientInfo'), search: `?mode=view&id=${id}` });
                }}> View Company</S.confirmViewBtn>
                <S.confirmAddBtn onClick={() => {
                    history.push({ pathname: protectedRoutes.company('clientInfo'), search: 'mode=add' });
                    setTabLocation({});
                }}> Add Another Company</S.confirmAddBtn>
                </S.confirmBtnBlock>
            </>
    );
};

Confirmation.propTypes = {
    setTabLocation: PropTypes.func,
    location: PropTypes.object,
    fetComapnyDetails: PropTypes.func,
};

const mapDispatchToProps = {
    setTabLocation: companyActions.setTabLocation,
    fetComapnyDetails: companyActions.fetComapnyDetails,
};

export default connect(
    null, mapDispatchToProps,
)(withRouter(Confirmation));
