import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial State
const initialState = {
    status: 'idle',
    error: '',
    results: [],
    resultsFiltered: [],
    resultType: '',
    secondaryTagFilters: {
        "tiny": "not selected",
        "raucous": "not selected",
        "iconic": "not selected",
        "rooftop": "not selected",
        "killer cocktails": "not selected"
    }
};

// Slice
const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        flipSecondaryTagFilter: (state, action) => {
            const tag = action.payload;
            state.secondaryTagFilters[tag] = state.secondaryTagFilters[tag] === "selected" ? "not selected" : "selected";
        },
        filterResults: (state, action) => {
            const secondaryTagFiltersMask = Object.values(state.secondaryTagFilters).map(item => item === "selected" ? true : false);
            const selectedSecondaryTagFilters = Object.keys(state.secondaryTagFilters).filter((tag, index) => {
                return secondaryTagFiltersMask[index]
            });
            state.resultsFiltered = state.results.filter(
                result => {
                    const includedTags = new Array(selectedSecondaryTagFilters.length);
                    for (let i = 0; i < selectedSecondaryTagFilters.length; i++) {
                        if (result.secondary_tags.includes(selectedSecondaryTagFilters[i])) {
                            includedTags[i] = true;
                        } else {
                            includedTags[i] = false;
                        };
                    };
                    if (includedTags.every(t => t === true)) {
                        return true;
                    } else {
                        return false;
                    };
                }
            );
        },
        clearFilters: (state, action) => {
            state.secondaryTagFilters = initialState.secondaryTagFilters;
            state.resultsFiltered = state.results;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSearchResults.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.results = action.payload.results;
                state.resultsFiltered = action.payload.results;
                state.resultType = action.payload.resultType;
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
                state.results = action.payload.results;
                state.resultsFiltered = action.payload.results;
                state.resultType = action.payload.resultType;

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
        return responseJSON;
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
        return responseJSON;
    }
)

// Selectors
const selectResultsStatus = state => state.results.status;
const selectResultsFiltered = state => state.results.resultsFiltered;
const selectResultType = state => state.results.resultType;
const selectSecondaryTagFilters = state => state.results.secondaryTagFilters;

// Exports
export const { 
    flipSecondaryTagFilter,
    filterResults,
    clearFilters
} = resultsSlice.actions;
export {
    fetchSearchResults,
    fetchNearMeResults
}
export {
    selectResultsStatus,
    selectResultsFiltered,
    selectResultType,
    selectSecondaryTagFilters
}
export default resultsSlice.reducer;