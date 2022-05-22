import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
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
    selectSecondaryTagFilters
    } from './resultsSlice';

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
            <h1>Loading...</h1>
        </div>
    )
};

const ResultsSuccess = () => {
    const results = useSelector(selectResultsFiltered);
    const resultType = useSelector(selectResultType);
    const activeTags = useSelector(selectActiveTags);

    return (
        <div className="content-container">
            <div className="results-header">
                <p>Here are your results!</p>
                {   
                    resultType === 'search' ?
                    <div className="results-tags-gallery">
                        {
                            activeTags.map((tag, key) => {
                                return (
                                    <span key={key} className="search-tag-selected">{tag}</span>
                                )
                            })
                        }
                    </div>
                    : ''
                }
            </div>
            <div className="results-body">
                <div className="results-sidebar">
                    <ResultsFilters />
                </div>
                <div className="results-content">
                    {
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

const ResultsError = () => {
    return (
        <div className="content-container">
            <h1>Oh no! Error...</h1>
        </div>
    )
};

const ResultCard = ({ record }) => {
    const resultType = useSelector(selectResultType);

    // Helper functions
    const dollarSigns = num => '$'.repeat(num);

    return (
        <div className="results-card">
            <a href={record.website}><h1>{record.name}</h1></a>
            <div className="results-card-details">
                <a href="/">{record.category}</a>
                <a href="/">{dollarSigns(record.price)}</a>
                <a href="/">{record.location}</a>
                {resultType === 'nearMe' ? <a href="/">{record.distance.toFixed(2)} km away</a> : ''}
            </div>
            <p>{record.description}</p>
            <div className="results-card-primary-tags">
                {
                    record.primary_tags.split(', ').map((tag, key) => {
                        return (
                            <a href='/' key={key}>{tag}</a>
                        )
                    })
                }
            </div>
            <div className="results-card-secondary-tags">
                {
                    record.secondary_tags.split(', ').map((tag, key) => {
                        return (
                            <a href='/' key={key}>{tag}</a>
                        )
                    })
                }
            </div>
        </div>
    )
};

const ResultsFilters = () => {
    const dispatch = useDispatch();

    // Define constants
    const secondaryTagFiltersState = useSelector(selectSecondaryTagFilters);
    const secondaryTagFilters = Object.keys(secondaryTagFiltersState);

    // Define helper functions
    const getSecondaryTagFilterClass = tag => {
        const filterTagState = secondaryTagFiltersState[tag];
        if (filterTagState === 'selected') {
            return "secondary-filter-tag secondary-filter-tag-selected";
        } else {
            return "secondary-filter-tag";
        };
    };

    const getSecondaryFiltersButtonClass = () => {
        const secondaryFiltersApplied = Object.values(secondaryTagFiltersState).includes('selected');
        if (secondaryFiltersApplied) {
            return "secondary-filters-button secondary-filters-button-ready";
        } else {
            return "secondary-filters-button";
        }
    }

    const handleSecondaryTagFilterClick = tag => {
        dispatch(flipSecondaryTagFilter(tag));
    };

    const handleSecondaryFiltersButtonClick = () => {
        dispatch(filterResults());
    };

    const handleClearSecondaryFiltersClick = () => {
        dispatch(clearFilters());
    };

    return (
        <div className="results-filters">
            <h1>More Filters</h1>
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
                Clear All Filters
            </button>
        </div>
    )
};

export default Results;