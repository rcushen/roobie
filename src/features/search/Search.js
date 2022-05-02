import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { 
  selectTagsStatus,
  selectReadyToSearch 
} from './searchSlice';
import { chooseTag } from './searchSlice';
import { 
  fetchSearchResults,
  fetchNearMeResults
} from '../results/resultsSlice';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const readyToSearch = useSelector(selectReadyToSearch);
  const tagsStatus = useSelector(selectTagsStatus);

  // Constants
  const searchTags = [
    "cheap",
    "fancy",
    "a good date place",
    "work-appropriate",
    "good to bring mates",
    "outdoors",
    "dance-y",
  ];

  // Helper functions
  const setTagButtonClasses = tagSelected => {
    return "search-tag" + (tagsStatus[tagSelected] ? " search-tag-selected" : "")
  }
  const setSearchButtonClasses = readyToSearch => {
    return "search-button" + (readyToSearch ? " search-button-ready" : " search-button-notready")
  };

  // Handler functions
  const handleSearchButtonClick = () => {
    if (readyToSearch) {
      dispatch(fetchSearchResults());
      navigate('/results', { replace: true })
    };
  };
  const handleNearMeButtonClick = () => {
    dispatch(fetchNearMeResults());
    navigate('/results', { replace: true })
  };

  return (
    <div className="search-container">
      <div className="search-hero">
        <h1 className="search-hero-text">roobie</h1>
        <p className="search-hero-text">Where to next?</p>
        <div className="search-form">
          <p>I want somewhere...</p>
          <div className="tags-gallery">
            {
              searchTags.map((tag, key) => {
              return (
                <button
                  key={key}
                  className={setTagButtonClasses(tag)}
                  onClick={() => { dispatch(chooseTag(tag)) }}
                >{tag}
                </button>
              )
            })
          }
          </div>
        </div>
        <div className="search-buttons">
          <button
            className={setSearchButtonClasses(readyToSearch)}
            onClick={handleSearchButtonClick}>
            Search
          </button>
          <button
            className="near-me-button"
            onClick={handleNearMeButtonClick}>
            Just show me somewhere near
          </button>
        </div>
      </div>
    </div>
  )
};

export default Search;
