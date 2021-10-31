import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showCart: false,
    notification: null,
  },
  reducers: {
    toggle: (state) => {
      state.showCart = !state.showCart;
    },
    showNotification: (state, action) => {
      const { status, title, message } = action.payload;
      state.notification = {
        status,
        title,
        message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
