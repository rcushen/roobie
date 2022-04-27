import { configureStore } from '@reduxjs/toolkit';

import searchReducer from '../features/search/searchSlice';
import resultsReducer from '../features/results/resultsSlice';
import footerReducer from '../features/footer/footerSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    results: resultsReducer,
    footer: footerReducer
  },
});
