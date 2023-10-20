/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
        return action.payload
    case "RESET":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' });
      }, 5000);
    }
  }, [notification, notificationDispatch]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext