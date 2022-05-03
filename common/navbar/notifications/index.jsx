import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import NotificationIcon from 'src/web/ats/assets/icons/notification_icon.svg';
import { sanitizeHtml } from 'src/web/utils';
import { candidateOverviewActions } from '../../../../redux/modules/candidateOverview/creator';
import { jobOverviewActions } from '../../../../redux/modules/jobOverview/creator';
import { notificationsActions } from '../../../../redux/modules/notifications/creator';
import notificationsSelectors from '../../../../redux/modules/notifications/selector';
import * as S from './styles';

const Notifications = ({
  openJobApplicationModal, openJobOverview,
  notifications,
  fetchNotifications,
  totalNotificationsCount,
  totalUnusedNotificationsCount,
  updateNotification,
  loadingNotifications,
}) => {
  const refOfOuterBlock = useRef();
  const listWrapperReference = useRef();
  const [isNotificationsOpen, toggleNotifications] = useState(false);

  const handleClickOutside = (e) => {
    if (refOfOuterBlock.current.contains(e.target)) return;
    toggleNotifications(false);
  };

  const scrollListener = () => {
    if (totalNotificationsCount <= notifications.length) return;
    const shouldFetchNotifications = (
      listWrapperReference.current.getBoundingClientRect().bottom - 440 < 150
    );
    if (shouldFetchNotifications) {
      fetchNotifications();
    }
  };

  useEffect(() => {
    if (isNotificationsOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationsOpen]);

  const redirectURL = (notificationItem) => () => {
    const {
      notification_type: notificationType,
      object_id: objectId,
      id,
      is_read: isRead,
    } = notificationItem;
    if (!isRead) {
      updateNotification(id);
    }
    const GET_ROUTE = {
      add_job_application: (applicationId) => openJobApplicationModal(applicationId),
      update_job_application: (applicationId) => openJobApplicationModal(applicationId),
      add_job: (jobId) => openJobOverview(jobId),
      assign_job: (jobId) => openJobOverview(jobId),
      update_job_status: (jobId) => openJobOverview(jobId),
    };
    if (GET_ROUTE[notificationType]) GET_ROUTE[notificationType](objectId);
  };

  const notificationItems = (notifications || []).map((notificationItem) => (
    <S.NotificationListItemContainer key={notificationItem.id}>
      <S.NotificationListItem
        onClick={redirectURL(notificationItem)}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(notificationItem.message),
        }}
      />
      {!notificationItem.is_read && <span />}
    </S.NotificationListItemContainer>
  ));

  if (!notificationItems.length) {
    notificationItems.push(<S.NotificationListItemContainer key={0}>
      <S.NotificationListItem
        onClick={() => {}}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml('No new notifications'),
        }}
      />
    </S.NotificationListItemContainer>);
  }

  const loader = loadingNotifications ? <WaitingIndicator fullWidth={true} msg={''} /> : null;

  return (
    <S.NotificationContainer ref={refOfOuterBlock}>
      <S.NotificationIcon
        onClick={() => toggleNotifications(!isNotificationsOpen)}>
        <img src={NotificationIcon} alt='Notifications' />
        {totalUnusedNotificationsCount ? (
          <S.NotificationUnusedCount>
            {totalUnusedNotificationsCount}
          </S.NotificationUnusedCount>
        ) : null}
      </S.NotificationIcon>
        {isNotificationsOpen ? (
          <S.NotificationSubContainer>
            <S.NotificationList
              onScroll={scrollListener}
              isActive={isNotificationsOpen}
            >
              <div ref={listWrapperReference}>
                {notificationItems}
                {loader}
              </div>
            </S.NotificationList>
          </S.NotificationSubContainer>
        ) : null}
    </S.NotificationContainer>
  );
};

Notifications.propTypes = {
  history: PropTypes.object,
  notifications: PropTypes.array,
  fetchNotifications: PropTypes.func,
  updateNotification: PropTypes.func,
  openJobOverview: PropTypes.func,
  openJobApplicationModal: PropTypes.func,
  totalNotificationsCount: PropTypes.number,
  totalUnusedNotificationsCount: PropTypes.number,
  loadingNotifications: PropTypes.bool,
};

const mapStateToProps = ({ notifications }) => ({
  notifications: notificationsSelectors.getNotifications({ notifications }),
  totalNotificationsCount: notificationsSelectors.getTotalNotificationsCount({ notifications }),
  totalUnusedNotificationsCount: notificationsSelectors.getTotalUnusedNotificationsCount({
    notifications,
  }),
  loadingNotifications: notificationsSelectors.isLoading({ notifications }),
});

const mapDispatchToProps = {
  fetchNotifications: notificationsActions.fetchNotifications,
  updateNotification: notificationsActions.updateNotification,
  openJobApplicationModal: candidateOverviewActions.openModal,
  openJobOverview: jobOverviewActions.openModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Notifications));
