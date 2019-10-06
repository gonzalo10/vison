import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faExclamationTriangle,
  faExclamation,
  faCheckCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

import color from '../colors';

import { notificationsActions } from '../../_actions';

const NotifiactionBase = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 20px;
  min-width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  height: 25px;
  box-shadow: -1px 7px 24px -6px rgba(0, 0, 0, 0.43);
  color: white;
  z-index: 9;
`;
const SuccessNotification = styled(NotifiactionBase)`
  background-color: ${color.success};
`;
const ErrorNotifiaction = styled(NotifiactionBase)`
  background-color: ${color.error};
`;
const WarningNotifiacation = styled(NotifiactionBase)`
  background-color: ${color.warning};
`;
const InfoNotifiacation = styled(NotifiactionBase)`
  background-color: ${color.info};
`;

const Icon = styled(FontAwesomeIcon)`
  padding: 10px;
`;
const IconClose = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Notifications = ({ dispatch, notifications }) => {
  let Notifiaction = InfoNotifiacation;
  let notificationIcon;
  const handleClickClose = () => {
    dispatch(notificationsActions.clear());
  };
  if (!notifications) {
    return null;
  }
  switch (notifications.type) {
    case 'success':
      Notifiaction = SuccessNotification;
      notificationIcon = faCheckCircle;
      break;
    case 'error':
      Notifiaction = ErrorNotifiaction;
      notificationIcon = faExclamationTriangle;
      break;
    case 'warning':
      Notifiaction = WarningNotifiacation;
      notificationIcon = faExclamation;
      break;
    case 'info':
      Notifiaction = InfoNotifiacation;
      notificationIcon = faInfoCircle;
      break;
    default:
      break;
  }
  if (!notificationIcon) {
    return null;
  }

  return (
    <Notifiaction>
      <Icon icon={notificationIcon} />
      {notifications.message}
      <IconClose icon={faTimes} onClick={handleClickClose} />
    </Notifiaction>
  );
};

function mapStateToProps(state) {
  const { notifications } = state;
  return {
    notifications,
  };
}

const connectedNotifications = connect(mapStateToProps)(Notifications);
export { connectedNotifications as Notifications };
