import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import { connect } from 'react-redux';
import ApproveButtonIcon from 'src/web/ats/assets/icons/approve_btn_icon.svg';
import RejectButtonIcon from 'src/web/ats/assets/icons/reject_btn_icon.svg';
import ArrowIcon from 'src/web/ats/assets/icons/arrow.png';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import 'swiper/css/swiper.css';
import {
  ApprovalCard,
  ApprovalCardActionItem,
  ApprovalCardActions,
  ApprovalCardButton,
  ApprovalCardButtonIcon,
  ApprovalCardDetails,
  ApprovalCardDetailsContainer,
  ApprovalCardMetaDetails,
  ApprovalCards,
  Card,
  FlexBox,
  SliderActionDivider,
  SliderActionNext,
  SliderActionPrev,
  SliderActions,
  Title,
} from './styles';

const SWIPER_PARAMS = {
  slidesPerView: 5,
  spaceBetween: 24,
  scrollbar: {
    draggable: false,
  },
  allowTouchMove: false,
  breakpoints: {
    // when window width is >= 767px
    767: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    // when window width is >= 1023px
    1023: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    // when window width is >= 1367px
    1367: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    // when window width is >= 1660px
    1660: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
};

const InternalApprovals = ({
  pendingApprovals,
  approveAssignment,
  rejectAssignment,
}) => {
  if (pendingApprovals && !pendingApprovals.length) return null;

  const [swiper, setSwiper] = useState(null);
  const [isNext, setIsNext] = useState(true);
  const [isPrevious, setIsPrevious] = useState(false);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
      if (swiper.isEnd) {
        setIsNext(false);
      } else {
        setIsPrevious(true);
      }
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
      if (swiper.isBeginning) {
        setIsPrevious(false);
      } else {
        setIsNext(true);
      }
    }
  };

  const approve = (id) => () => approveAssignment(id);
  const reject = (id) => () => rejectAssignment(id);

  return (
    <Card id='internalApprovals'>
      <FlexBox>
        <Title>Internal Approvals</Title>
        <SliderActions>
          {swiper && (
            <SliderActionPrev
              disabled={!isPrevious}
              onClick={goPrev}
              title={isPrevious ? 'Previous' : null}
            >
              <img src={ArrowIcon} alt='Prev' />
            </SliderActionPrev>
          )}
          <SliderActionDivider />
          {swiper && (
            <SliderActionNext
              disabled={!isNext}
              onClick={goNext}
              title={isNext ? 'Next' : null}
            >
              <img src={ArrowIcon} alt='Next' />
            </SliderActionNext>
          )}
        </SliderActions>
      </FlexBox>
      <ApprovalCards>
        <Swiper {...SWIPER_PARAMS} getSwiper={setSwiper} shouldSwiperUpdate={true}>
        {pendingApprovals
          .map((item, index) => {
            const {
              job_title: jobTitle,
              company_name: companyName,
              assigned_to: assignedTo,
              id,
              location,
              assigned_by: assignedBy,
            } = item;
            return (
              <ApprovalCard key={index}>
                <ApprovalCardMetaDetails>
                  <h4>{jobTitle}</h4>
                  <p>{companyName}</p>
                  <p>
                    {location.reduce((_, l) => (_ ? `${_}, ${l.city}` : l.city), '')}
                  </p>
                </ApprovalCardMetaDetails>
                <ApprovalCardDetailsContainer>
                  <div>
                    <ApprovalCardDetails>
                      <p>Assigned by</p>
                      <span title={assignedBy}>{assignedBy}</span>
                    </ApprovalCardDetails>
                    <ApprovalCardDetails>
                      <p>Assigned to</p>
                      <span title={assignedTo}>{assignedTo}</span>
                    </ApprovalCardDetails>
                  </div>
                  <ApprovalCardActions>
                    <ApprovalCardActionItem onClick={approve(id)} type='accept'>
                      <ApprovalCardButtonIcon src={ApproveButtonIcon}/>
                      <ApprovalCardButton >Approve</ApprovalCardButton>
                    </ApprovalCardActionItem>
                    <ApprovalCardActionItem onClick={reject(id)} type='reject'>
                      <ApprovalCardButtonIcon src={RejectButtonIcon}/>
                      <ApprovalCardButton>Reject</ApprovalCardButton>
                    </ApprovalCardActionItem>
                  </ApprovalCardActions>
                </ApprovalCardDetailsContainer>
              </ApprovalCard>
            );
          })}
        </Swiper>
      </ApprovalCards>
    </Card>
  );
};

InternalApprovals.propTypes = {
  pendingApprovals: PropTypes.array,
  approveAssignment: PropTypes.func,
  rejectAssignment: PropTypes.func,
};

const mapStateToProps = ({ session }) => ({
  pendingApprovals: sessionSelectors.getPendingApprovals({ session }),
});

const mapDispatchToProps = {
  approveAssignment: sessionActions.approveInternalApproval,
  rejectAssignment: sessionActions.rejectInternalApproval,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalApprovals);
