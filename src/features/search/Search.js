import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Search.css'

import {
  selectSearchCity,
  selectSearchCityOpen,
  selectSearchType,
  selectTagsStatus,
  selectReadyToSearch 
} from './searchSlice';
import { 
  flipSearchCityDropdown,
  changeSearchCity,
  chooseSearchType,
  chooseTag,
  updateLocation
} from './searchSlice';
import { 
  fetchSearchResults,
  fetchNearMeResults
} from '../results/resultsSlice';

import downArrow from './../../assets/general_icons/down_arrow.svg'

const Search = () => {
  return (
    <div className="search-container">
      <div className="search-body">
        <h1 className="search-hero">roobie</h1>
        <SearchCity />
        <SearchPrompt />
        <SearchForm />
      </div>
    </div>
  )
};

const SearchCity = () => {
  const dispatch = useDispatch();

  const searchCity = useSelector(selectSearchCity);
  const searchCityOpen = useSelector(selectSearchCityOpen);

  // Helper functions
  const handleSearchCityButtonClick = () => {
    dispatch(flipSearchCityDropdown());
  };
  const handleSearchCityOptionClick = city => {
    dispatch(changeSearchCity(city));
    dispatch(flipSearchCityDropdown());
  }
  const handleOverlayClick = () => {
    dispatch(flipSearchCityDropdown());
  };

  if (searchCityOpen) {
    return (
      <div className="search-city">
        <div className="search-city-dropdown-open">
          <div className="search-cities-gallery">
            <button
              className="search-city-option search-city-option-selected"
              onClick={() => handleSearchCityOptionClick("Melbourne")}
            >
              <span>roobie MELBOURNE</span>
            </button>
            <button
              className="search-city-option search-city-option-notyet"
              // onClick={() => handleSearchCityOptionClick("Sydney")}
            >
              roobie SYDNEY*
            </button>
            <button
              className="search-city-option search-city-option-notyet"
              // onClick={() => handleSearchCityOptionClick("Brisbane")}
            >
              roobie BRISBANE*
            </button>
          </div>
          <p>*Coming soon!</p>
        </div>
        <div 
          className="overlay"
          onClick={handleOverlayClick}
        >
        </div>
      </div>
    )
  } else {
    return (
      <div className="search-city">
        <div className="search-city-dropdown-closed">
          <button
            className="search-city-button"
            onClick={handleSearchCityButtonClick}
          >
            {searchCity} <img className="search-city-down-arrow" src={downArrow} alt='' />
          </button>
        </div>
      </div>
    )
  };
};

const SearchPrompt = () => {
  // Constants
  const possibleSearchPrompts = [
    'Where to next?',
    'Funny joke about bars',
    'More funnies',
    'Jokes go here',
    'Ha ha funny funny line',
    'He he he hoo hoo ha ha ha'
  ];

  // Helper functions
  const selectSearchPrompt = possibleSearchPrompts => {
    return possibleSearchPrompts[Math.floor(Math.random() * possibleSearchPrompts.length)];
  };

  return (
    <div className="search-prompt">
      <p>{selectSearchPrompt(possibleSearchPrompts)}</p>
    </div>
  )
}

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchType = useSelector(selectSearchType);
  const readyToSearch = useSelector(selectReadyToSearch);

  // Helper functions
  const setSearchButtonClasses = readyToSearch => {
    return "search-button" + (readyToSearch ? " search-button-ready" : " search-button-notready")
  };
  const setSearchTypeButtonClasses = which => {
    return "search-type" + (searchType === which ? " search-type-selected" : " search-type-notselected")
  }

  // Handler functions
  const handleSearchButtonClick = () => {
    if (readyToSearch && searchType === "Vibe") {
      dispatch(fetchSearchResults());
      navigate('/results', { replace: true })
    } else if (readyToSearch && searchType === "Location") {
      const locationSuccess = position => {
        dispatch(updateLocation({ lat: position.coords.latitude, lon: position.coords.longitude }))
        dispatch(fetchNearMeResults());
        navigate('/results', { replace: true })
      };
      const locationFailure = () => {
        alert('We need your location!')
      };
      navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure);
    };
  };

  return (
    <div className="search-form">
      <div className="search-form-header">
        <button 
          className={setSearchTypeButtonClasses("Vibe") + " search-type-left"}
          onClick={() => { dispatch(chooseSearchType("Vibe")) }}
        >
          Vibe
        </button>
        <button
          className={setSearchTypeButtonClasses("Location") + " search-type-right"}
          onClick={() => { dispatch(chooseSearchType("Location")) }}
        >
          Location
        </button>
      </div>
      {searchType === "Vibe" ? <VibeSearch /> : <LocationSearch /> }
      <div className="search-button-container">
        <button
          className={setSearchButtonClasses(readyToSearch)}
          onClick={handleSearchButtonClick}
        >
          <span>Find Venues</span>
        </button>
      </div>
    </div>
  )
}

const VibeSearch = () => {
  const dispatch = useDispatch();

  const tagsStatus = useSelector(selectTagsStatus);

  // Constants
  const searchTags = [
    "cheap",
    "a good date place",
    "good to bring mates",
    "fancy",
    "work-appropriate",
    "outdoors",
    "dance-y",
  ];

  // Helper functions
  const setTagButtonClasses = tagSelected => {
    return "search-tag" + (tagsStatus[tagSelected] ? " search-tag-selected" : " search-tag-notselected")
  }

  const generateSearchString = tagsStatus => {
    const activeTags = Object.keys(tagsStatus).filter((element, index) => Object.values(tagsStatus)[index]);

    if (activeTags.length === 0) {
      return "<p>Find a bar or pub that is...</p>"
    } else {
      let searchString = activeTags.reduce((previousValue, currentValue) => {
        return previousValue + ` <em>${currentValue}</em> and`
      }, "")
      searchString = "<p>Find a bar or pub that is " + searchString + "...</p>";
      return searchString;
    }
  };

  return (
    <div className="search-type-container">
      <div className="search-string" dangerouslySetInnerHTML={{__html: generateSearchString(tagsStatus)}}>
      </div>
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
  )
}

const LocationSearch = () => {
  return (
    <div className="search-type-container">
      <div className="search-string search-string-location">
        <p>Find a bar or pub that is <em>near me!</em></p>
      </div>
  </div>
  )
}

export default Search;
