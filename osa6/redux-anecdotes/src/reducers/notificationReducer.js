import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            return action.payload;
        },
        resetNotification() {
            return '';
        }
    }
})

export const setNotification = (content, time) => {
    return (dispatch) => {
      dispatch(notificationSlice.actions.notificationChange(content));
      setTimeout(() => {
        dispatch(notificationSlice.actions.resetNotification());
      }, time * 1000);
    };
  };

export const { notificationChange, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer