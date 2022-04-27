import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userEmail: undefined,
    userAlreadySubscribed: false
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
      setUserEmail: (state, action) => {
          state.userEmail = action.payload;
      },
      setUserSubscribed: (state) => {
          state.userAlreadySubscribed = true;
      }
  }  
});

export const { setUserEmail, userAlreadySubscribed } = footerSlice.actions;

export default footerSlice.reducer;