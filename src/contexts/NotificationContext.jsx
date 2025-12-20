import React, { createContext, useState, useContext } from 'react';
const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);
export const NotificationProvider = ({
  children
}) => {
  const [notifications, setNotifications] = useState([]);
  const addNotification = (type, message, duration = 5000) => {
    const id = Date.now();
    const newNotification = {
      id,
      type,
      message,
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    // Auto-dismiss after duration
    if (duration) {
      setTimeout(() => {
        dismissNotification(id);
      }, duration);
    }
    return id;
  };
  const dismissNotification = id => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  const markAsRead = id => {
    setNotifications(prev => prev.map(notification => notification.id === id ? {
      ...notification,
      read: true
    } : notification));
  };
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      read: true
    })));
  };
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };
  const value = {
    notifications,
    addNotification,
    dismissNotification,
    markAsRead,
    markAllAsRead,
    getUnreadCount
  };
  return <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>;
};