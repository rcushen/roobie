import React from 'react';

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
};

export default NoResults;