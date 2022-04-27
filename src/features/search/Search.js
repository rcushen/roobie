import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { 
  selectParamsOccasion, 
  selectParamsStyle, 
  selectParamsAmbience,
  selectReadyToSearch 
} from './searchSlice';
import { flipParameterValue } from './searchSlice';
import { fetchResults } from '../results/resultsSlice';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paramsOccasion = useSelector(selectParamsOccasion);
  const paramsStyle = useSelector(selectParamsStyle);
  const paramsAmbience = useSelector(selectParamsAmbience);
  const readyToSearch = useSelector(selectReadyToSearch);

  const setParameterButtonClasses = (parameterValue, side) => {
    return "search-parameter-button" + (parameterValue ? " search-parameter-button-active" : "") + (side === "left" ? " search-parameter-button-left" : " search-parameter-button-right")
  };
  const setSearchButtonClasses = readyToSearch => {
    return "search-button" + (readyToSearch ? " search-button-ready" : " search-button-notready")
  };

  const handleParameterButtonClick = (group, parameter) => {
    dispatch(flipParameterValue({ group, parameter }))
  };
  const handleSearchButtonClick = () => {
    if (readyToSearch) {
      dispatch(fetchResults());
      navigate('/results', { replace: true })
    }
  }

  return (
    <div className="search-container">
      <div className="search-hero">
        <h1 className="search-hero-text">roobie</h1>
        <p className="search-hero-text">Where to next?</p>
        <div className="search-form">
          <p>I want somewhere suited for...</p>
          <div className="search-parameter-pair search-parameters-occasion">
            <button 
              className={setParameterButtonClasses(paramsOccasion.friends, "left")}
              onClick={() => handleParameterButtonClick("occasion", "friends")}>
              Friends
            </button>
            <button 
              className={setParameterButtonClasses(paramsOccasion.date, "right")}
              onClick={() => handleParameterButtonClick("occasion", "date")}>
              A Date
            </button>
          </div>
          <p>...that is...</p>
          <div className="search-parameter-pair search-parameters-style">
          <button 
              className={setParameterButtonClasses(paramsStyle.classy, "left")}
              onClick={() => handleParameterButtonClick("style", "classy")}>
              Classy
            </button>
            <button 
              className={setParameterButtonClasses(paramsStyle.casual, "right")}
              onClick={() => handleParameterButtonClick("style", "casual")}>
              Casual
            </button>
          </div>
          <p>...and...</p>
          <div className="search-parameter-pair search-parameters-ambience">
            <button 
              className={setParameterButtonClasses(paramsAmbience.lively, "left")}
              onClick={() => handleParameterButtonClick("ambience", "lively")}>
              Lively
            </button>
            <button 
              className={setParameterButtonClasses(paramsAmbience.intimate, "right")}
              onClick={() => handleParameterButtonClick("ambience", "intimate")}>
              Intimate
            </button>
          </div>
          <button
            className={setSearchButtonClasses(readyToSearch)}
            onClick={handleSearchButtonClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  )
};

export default Search;
