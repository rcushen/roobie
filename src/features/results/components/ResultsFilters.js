import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
    selectSecondaryTagFiltersOpen,
    selectSecondaryTagFilters,
    } from './../resultsSlice';

import {
    flipSecondaryTagFiltersPane,
    flipSecondaryTagFilter,
    filterResults,
    clearFilters,
    } from './../resultsSlice';

import downArrow from './../../../assets/general_icons/down_arrow.svg'


const ResultsFilters = () => {
    const dispatch = useDispatch();
    
    // Define constants
    const secondaryTagFiltersOpen = useSelector(selectSecondaryTagFiltersOpen);
    const secondaryTagFiltersState = useSelector(selectSecondaryTagFilters);
    const secondaryTagFilters = Object.keys(secondaryTagFiltersState);

    const secondaryTagFiltersCategories = {
        "Food":["great snacks","pub grub","proper meals","gluten free options","top tier chippies","charc"],
        "Drink":["great beers","vino on point","killer cocktails"],
        "Vibe":["quiet","good for the sesh","lively","has a theme"],
        "Time":["lunchtime","afternoon","evening","late-night"],
        "Setting":["might have to stand","tiny","large","good views","rooftop","iconic"],
        "Special":["happy hour now","roobie's choice","new","cover charge"]
    };
    let secondaryTagFiltersCategorised = Object.keys(secondaryTagFiltersCategories).reduce((o, key) => ({...o, [key]:[]}), {});
    secondaryTagFilters.forEach(tag => {
        for (const category of Object.keys(secondaryTagFiltersCategories)) {
            if (secondaryTagFiltersCategories[category].includes(tag)) {
                secondaryTagFiltersCategorised[category] = [...secondaryTagFiltersCategorised[category], tag];
            };
        };
    });

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
                            Object.keys(secondaryTagFiltersCategorised).map((category, index) => {
                                if (secondaryTagFiltersCategorised[category].length === 0) {
                                    return ""
                                } else {
                                    return (
                                        <div className="filters-category" key={index}>
                                            <p>{category}</p>
                                            <div className="filters-category-gallery">
                                                {
                                                    secondaryTagFiltersCategorised[category].map((tag, index) => {
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
                                        </div>
                                    )
                                }
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
};

export default ResultsFilters;