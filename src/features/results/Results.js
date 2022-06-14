import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    flipSecondaryTagFiltersPane,
    flipSecondaryTagFilter,
    filterResults,
    clearFilters
    } from './resultsSlice';
import {
    selectActiveTags
    } from '../search/searchSlice';   
import {
    selectResultsFiltered,
    selectResultsStatus, 
    selectResultType,
    selectSecondaryTagFiltersOpen,
    selectSecondaryTagFilters
    } from './resultsSlice';

import downArrow from './../../assets/general_icons/down_arrow.svg'

import './Results.css'

const Results = () => {
    const navigate = useNavigate();
    const resultsStatus = useSelector(selectResultsStatus);
    
    useEffect(() => {
        if (resultsStatus === 'idle') {
            navigate('/', { replace: true });
        };
    });

    switch (resultsStatus) {
        case 'loading':
            return <ResultsLoading />
        case 'succeeded':
            return <ResultsSuccess />
        case 'error':
            return <ResultsError />
        default:
            return <ResultsError />
    };
};

const ResultsLoading = () => {
    return (
        <div className="content-container">
        </div>
    )
};

const ResultsError = () => {
    return (
        <div className="content-container">
            <div className="results-error">
                <h3>Oh no! A bug!</h3>
                <p>We are working on fixing this as soon as possible. If you would like, you can <a href='mailto:hello@roobie.com.au'>contact us here</a> to give us more details.</p>
            </div>
        </div>
    )
};

const ResultsSuccess = () => {
    const results = useSelector(selectResultsFiltered);
    
    return (
        <div className="content-container">
            <div className="results-header">
                <ResultsString />
                <ResultsFilters />
            </div>
            <div className="results-body">
                <div className="results-content">
                    { results.length === 0 ? <NoResults /> : 
                        results.map((record, key) => {
                            return ( 
                                <ResultCard key={key} record={record} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

const ResultsString = () => {
    const resultType = useSelector(selectResultType);
    const activeTags = useSelector(selectActiveTags);

    // Helper functions
    const generateResultsString = (activeTags, resultType) => {
        if (resultType === 'nearMe') {
            return "<p>Showing venues that are <em>near me</em></p>";
        } else {
            let resultsString = activeTags.reduce((previousValue, currentValue) => {
                return previousValue + ` <em>${currentValue}</em> and`
            }, "")
            resultsString = "<p>Showing venues that are " + resultsString.substring(0, resultsString.length - 4) + "</p>";
            return resultsString;
        };
    };
    return <div className="results-string" dangerouslySetInnerHTML={{__html: generateResultsString(activeTags, resultType)}}></div>;
}

const ResultsFilters = () => {
    const dispatch = useDispatch();
    
    // Define constants
    const secondaryTagFiltersOpen = useSelector(selectSecondaryTagFiltersOpen);
    const secondaryTagFiltersState = useSelector(selectSecondaryTagFilters);
    const secondaryTagFilters = Object.keys(secondaryTagFiltersState);

    // Define helper functions
    const getSecondaryTagFilterClass = tag => {
        const filterTagState = secondaryTagFiltersState[tag];
        if (filterTagState === 'selected') {
            return "secondary-filter-tag secondary-filter-tag-selected";
        } else {
            return "secondary-filter-tag secondary-filter-tag-notselected";
        };
    };

    const getSecondaryFiltersButtonClass = () => {
        const secondaryFiltersApplied = Object.values(secondaryTagFiltersState).includes('selected');
        if (secondaryFiltersApplied) {
            return "secondary-filters-button secondary-filters-button-ready";
        } else {
            return "secondary-filters-button secondary-filters-button-notready";
        }
    }

    const handleDropdownButtonClick = () => {
        dispatch(flipSecondaryTagFiltersPane())
    };

    const handleSecondaryTagFilterClick = tag => {
        dispatch(flipSecondaryTagFilter(tag));
    };

    const handleSecondaryFiltersButtonClick = () => {
        dispatch(filterResults());
    };

    const handleClearSecondaryFiltersClick = () => {
        dispatch(clearFilters());
    };

    if (secondaryTagFiltersOpen) {
        return (
            <div className="results-filters">
                <div className="results-filters-dropdown">
                    <button
                    className="results-filters-dropdown-button"
                    onClick={handleDropdownButtonClick}
                    >
                        Hide Filters
                        <img className="search-city-down-arrow" src={downArrow} alt=""/>
                    </button>
                </div>
                <div className="filters-form">
                    <div className="filters-gallery">
                        {
                            secondaryTagFilters.map((tag, index) => {
                                return (
                                    <button key={tag}
                                    className={getSecondaryTagFilterClass(tag)}
                                    onClick={() => handleSecondaryTagFilterClick(tag)}
                                    >
                                        {tag}
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div className="filters-buttons">
                        <button
                        className={getSecondaryFiltersButtonClass()}
                        onClick={handleSecondaryFiltersButtonClick}
                        >
                            Apply Filters
                        </button>
                        <button
                        className="clear-secondary-filters-button"
                        onClick={handleClearSecondaryFiltersClick}
                        >
                            (or clear all filters)
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="results-filters">
                <div className="results-filters-dropdown">
                    <button
                    className="results-filters-dropdown-button"
                    onClick={handleDropdownButtonClick}
                    >
                        More Filters
                        <img className="search-city-down-arrow" src={downArrow} alt=""/>
                    </button>
                </div>
            </div>
        )
    };
}

const ResultCard = ({ record }) => {
    const resultType = useSelector(selectResultType);

    // Helper functions
    const dollarSigns = num => '$'.repeat(num);
    const dollarSignsPad = num => '$'.repeat(3 - num);

    return (
        <div className="results-card">
            <div className="results-card-header">
                <a href={record.website}><h2>{record.name}</h2></a>
            </div>
            
            <div className="results-card-details">
                <p>{record.category}</p>
                <p>{dollarSigns(record.price)}<em>{dollarSignsPad(record.price)}</em></p>
                <p>{record.location}</p>
                {resultType === 'nearMe' ? <p>{record.distance.toFixed(2)} km away</p> : ''}
            </div>
           
            <div className="results-card-content">
                <p>{record.description}</p>
                <div className="results-card-links">
                    <a href='https://www.goodheavens.com.au/'>Website</a>
                    <a href='https://www.instagram.com.au'>Instagram</a>
                    <a href='https://goo.gl/maps/MkYUPKf2pYM8NewT6'>Google Maps</a>
                </div>
            </div>
            <div className="results-card-secondary-tags">
                {
                    record.secondary_tags.split(', ').slice(0,4).map((tag, key) => {
                        return (
                            <a href='/' key={key}>{tag}</a>
                        )
                    })
                }
            </div>
        </div>
    )
};

const NoResults = () => {
    // Helper functions
    const handleSearchAgainButtonClick = () => {
        window.location.href = '/'
    };

    return (
        <div className="no-results">
            <h3>No results found</h3>
            <p className="no-results-explanation">Unfortunately, we don't know anywhere that meets your search criteria. If you do, please <a href="mailto:hello@roobie.com.au">let us know!</a></p>
            <button
                className="search-again-button"
                onClick={handleSearchAgainButtonClick}
            >
                Search Again
            </button>
            <p className="no-results-punchline">(in the meantime, try being less specific)</p>
        </div>
    )
}

export default Results;