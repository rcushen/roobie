import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  occasion: {
    friends: false,
    date: false
  },
  style: {
    classy: false,
    casual: false
  },
  ambience: {
    lively: false,
    intimate: false
  },
  readyToSearch: false
};

// Slice
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    flipParameterValue: (state, action) => {
      // Flip that parameter value
      const { group, parameter } = action.payload;
      state[group][parameter] = !state[group][parameter];
        
      // Update the other parameter value as needed
      const groupParameters = Object.keys(state[action.payload.group]);
      const otherParameter = groupParameters.filter(item => item !== parameter)[0];

      if (state[group][otherParameter]) {
        state[group][otherParameter] = false;
      };

      // Update readyToSearch as needed
      if (
        ( state.occasion.friends || state.occasion.date ) &&
        ( state.style.classy || state.style.casual ) &&
        ( state.ambience.lively || state.ambience.intimate )
        ) {
          state.readyToSearch = true;
        } else {
          state.readyToSearch = false;
        }
    },

  }
});

// Async Actions

// Selectors
const selectParamsOccasion = (state) => state.search.occasion;
const selectParamsStyle = (state) => state.search.style;
const selectParamsAmbience = (state) => state.search.ambience;
const selectReadyToSearch = (state) => state.search.readyToSearch;

// Exports
export const { flipParameterValue } = searchSlice.actions;
export { 
  selectParamsOccasion, 
  selectParamsStyle, 
  selectParamsAmbience,
  selectReadyToSearch };
export default searchSlice.reducer;
