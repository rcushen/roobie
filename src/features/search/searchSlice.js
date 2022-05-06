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
  nearMeParameters: {
    lat: -37.815491,
    lon: 144.969502
  },
  readyToSearch: false
};

// Slice
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    chooseTag: (state, action) => {
      const tag = action.payload;
      state.searchTags[tag] = state.searchTags[tag] ? false : true; 
      
      const numTagsSelected = Object.values(state.searchTags).reduce((a, b) => a + b, 0)
      state.readyToSearch = numTagsSelected >= 1 ? true : false;
    },
  },
});

// Async Actions

// Selectors
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
export const { chooseTag } = searchSlice.actions;
export { 
  selectTagsStatus,
  selectReadyToSearch,
  selectActiveTags };
export default searchSlice.reducer;
