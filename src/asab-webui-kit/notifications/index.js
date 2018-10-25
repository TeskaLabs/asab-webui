import Notification from './Notification';
import NotificationList from './NotificationList';
import {actions, createNotification, removeNotification, reducer} from './redux';

const redux = {
  actions,
  createNotification,
  removeNotification,
  reducer,
}

export {
  Notification,
  NotificationList,
  redux,
}
