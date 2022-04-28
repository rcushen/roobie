import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  searchParameters: {
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
      state.searchParameters[group][parameter] = !state.searchParameters[group][parameter];
        
      // Update the other parameter value as needed
      const groupParameters = Object.keys(state.searchParameters[action.payload.group]);
      const otherParameter = groupParameters.filter(item => item !== parameter)[0];

      if (state.searchParameters[group][otherParameter]) {
        state.searchParameters[group][otherParameter] = false;
      };

      // Update readyToSearch as needed
      if (
        ( state.searchParameters.occasion.friends || state.searchParameters.occasion.date ) &&
        ( state.searchParameters.style.classy || state.searchParameters.style.casual ) &&
        ( state.searchParameters.ambience.lively || state.searchParameters.ambience.intimate )
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
const selectParamsOccasion = (state) => state.search.searchParameters.occasion;
const selectParamsStyle = (state) => state.search.searchParameters.style;
const selectParamsAmbience = (state) => state.search.searchParameters.ambience;
const selectReadyToSearch = (state) => state.search.readyToSearch;

// Exports
export const { flipParameterValue } = searchSlice.actions;
export { 
  selectParamsOccasion, 
  selectParamsStyle, 
  selectParamsAmbience,
  selectReadyToSearch };
export default searchSlice.reducer;
