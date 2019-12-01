import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationTriangle,
  faExclamation,
  faCheckCircle,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

import colors from "../colors";

import { notificationsActions } from "../../_actions";

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
  // transition: transform 1000ms ease-in;
  animation: slidein 3s linear 1s infinite alternate;
`;

const Notification = styled(NotifiactionBase)`
  border: 1px solid ${props => props.color};
`;

const NotifiactionText = styled.p`
  padding: 10px 25px;
  color: ${props => props.color};
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 22px;
  color: ${props => props.color};
`;
const IconClose = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: black;
`;

const Notifications = ({ dispatch, notifications }) => {
  const handleClickClose = () => {
    dispatch(notificationsActions.clear());
  };
  if (!notifications) {
    return null;
  }
  const NotificationsTypes = {
    success: faCheckCircle,
    error: faExclamationTriangle,
    warning: faExclamation,
    info: faInfoCircle
  };

  const notificationIcon = NotificationsTypes[notifications.type];

  if (!notificationIcon) {
    return null;
  }

  const color = colors[notifications.type];

  return (
    <Notification color={color}>
      <Icon icon={notificationIcon} color={color} />
      <NotifiactionText color={color}>{notifications.message}</NotifiactionText>
      <IconClose icon={faTimes} onClick={handleClickClose} />
    </Notification>
  );
};

function mapStateToProps(state) {
  const { notifications } = state;
  return {
    notifications
  };
}

const connectedNotifications = connect(mapStateToProps)(Notifications);
export { connectedNotifications as Notifications };
