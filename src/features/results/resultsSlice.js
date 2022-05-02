import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial State
const initialState = {
    status: 'idle',
    error: '',
    results: []
};

// Slice
const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSearchResults.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.results = action.payload;
                console.log(action.payload);
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchNearMeResults.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchNearMeResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.results = action.payload;
            })
            .addCase(fetchNearMeResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

// Async Actions
const fetchSearchResults = createAsyncThunk(
    'results/fetchSearchResults',
    async (args, thunkAPI) => {
        const state = thunkAPI.getState();
        
        const searchParameters = state.search.searchTags;
        
        const tags = Object.keys(searchParameters);
        const tagsFilter = Object.values(searchParameters);
        const queryTags = tags.filter((tag, index) => tagsFilter[index]);
        const queryString = '?primaryTags=' + queryTags.reduce((a, b) => a + ',' + b);
        const endpoint = '/search';
        
        const response = await fetch(endpoint + queryString);
        const responseJSON = await response.json();
        return responseJSON.searchResults;
    }
);

const fetchNearMeResults = createAsyncThunk(
    'results/fetchNearMeResults',
    async (args, thunkAPI) => {
        const state = thunkAPI.getState();

        const nearMeParameters = state.search.nearMeParameters;
        const query = {
            lat: nearMeParameters.lat,
            lon: nearMeParameters.lon
        };
        const queryString = '?' +
            'lat=' + query.lat + '&' +
            'lon=' + query.lon;
        const endpoint = '/nearme';

        const response = await fetch(endpoint + queryString);
        const responseJSON = await response.json();
        return responseJSON.nearMeResults;
    }
)

// Selectors
const selectResultsStatus = state => state.results.status;
const selectResults = state => state.results.results;

// Exports
export const { populateResults } = resultsSlice.actions;
export {
    fetchSearchResults,
    fetchNearMeResults
}
export {
    selectResultsStatus,
    selectResults
}
export default resultsSlice.reducer;