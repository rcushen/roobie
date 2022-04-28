import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import _ from 'lodash';
import results from './sampleData/sampleResults';
const sampleResults = _.sampleSize(results, 10);

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
    reducers: {
        populateResults: (state, action) => {
            state.results = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchResults.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.results = action.payload;
            })
            .addCase(fetchResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

// Async Actions
const fetchResults = createAsyncThunk(
    'results/fetchResults',
    async (args, thunkAPI) => {
        const state = thunkAPI.getState();
        const searchParameters = state.search.searchParameters;
        const query = {
            occasion: searchParameters.occasion.friends ? 'friends' : 'date',
            style: searchParameters.style.classy ? 'classy' : 'casual',
            ambience: searchParameters.ambience.lively ? 'lively' : 'intimate'
        };
        const queryString = '?' + 
            'occasion=' + query.occasion + '&' +
            'style=' + query.style + '&' +
            'ambience=' + query.ambience;
        const endpoint = '/search';
        console.log(endpoint + queryString);
        const response = await { data: sampleResults };
        return response.data;
    }
);

// Selectors
const selectResultsStatus = state => state.results.status;
const selectResults = state => state.results.results;

// Exports
export const { populateResults } = resultsSlice.actions;
export {
    fetchResults,
}
export {
    selectResultsStatus,
    selectResults
}
export default resultsSlice.reducer;