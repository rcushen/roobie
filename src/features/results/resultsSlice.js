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
    async () => {
        const response = await { data: ["some", "fake", "results"] };
        return response.data;
    }
);

// Selectors

// Exports
export const { populateResults } = resultsSlice.actions;
export {
    fetchResults,
}
export default resultsSlice.reducer;