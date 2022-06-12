import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  searchTags: {
    "cheap": false,
    "fancy": false,
    "a good date place": false,
    "work-appropriate": false,
    "good to bring mates": false,
    "outdoors": false,
    "dance-y": false,
  },
  searchType: "Vibe",
  nearMeParameters: {
    lat: -37,
    lon: 144
  },
  readyToSearch: false
};

// Slice
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    chooseSearchType: (state, action) => {
      if (action.payload === "Vibe") {
        state.searchType = "Vibe";
        state.searchTags = initialState.searchTags;
        state.readyToSearch = false;
      }
      if (action.payload === "Location") {
        state.searchType = "Location";
        state.searchTags = initialState.searchTags;
        state.readyToSearch = true;
      }
    },
    chooseTag: (state, action) => {
      const tag = action.payload;
      state.searchTags[tag] = state.searchTags[tag] ? false : true; 
      
      const numTagsSelected = Object.values(state.searchTags).reduce((a, b) => a + b, 0)
      state.readyToSearch = numTagsSelected >= 1 ? true : false;
    },
    updateLocation: (state, action) => {
      state.nearMeParameters = action.payload;
    }
  },
});

// Async Actions

// Selectors
const selectSearchType = state => state.search.searchType;
const selectTagsStatus = state => state.search.searchTags;
const selectReadyToSearch = state => state.search.readyToSearch;
const selectActiveTags = state => {
  const searchTags = state.search.searchTags;
  const tags = Object.keys(searchTags);
  const tagsFilter = Object.values(searchTags);
  const activeTags = tags.filter((tag, index) => tagsFilter[index]);
  return activeTags
} 

// Exports
export const { 
  chooseSearchType,
  chooseTag,
  updateLocation
} = searchSlice.actions;
export { 
  selectSearchType,
  selectTagsStatus,
  selectReadyToSearch,
  selectActiveTags };
export default searchSlice.reducer;
