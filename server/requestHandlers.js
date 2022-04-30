const { Pool } = require('pg');
const _ = require('lodash');

const { config } = require('../credentials/dbConfig')

const pool = new Pool(config);

const checkValiditySearchQuery = searchQuery => true;
const checkValidityNearMeQuery = nearMeQuery => true;

const searchHandler = (req, res) => {
    // Get the search query
    const searchQuery = {
        occasion: req.query.occasion,
        style: req.query.style,
        ambience: req.query.ambience
    };
    // Check that these search query parameters are valid
    if (!checkValiditySearchQuery(searchQuery)) {
        res.status(400).send({
            message: 'Invalid search query',
            context: 'Failed initial search query checks'
        });
    };
    // Construct the query according to these search parameters
    queryString = 'SELECT * FROM venues;';
    // Query the database
    pool.query(queryString, (error, result) => {
        if (error) {
            res.status(500).send({
                message: error.stack,
                context: 'Failed database query'
            })
        };
        res.status(200).send({
            searchQuery,
            searchResults: _.sampleSize(result.rows, 8)
        });
    });
};

const nearMeHandler = (req, res) => {
    // Get the search query
    const nearMeQuery = {
        lat: req.query.lat,
        lon: req.query.lon
    };
    // Check that these search query parameters are valid
    if (!checkValidityNearMeQuery(nearMeQuery)) {
        res.status(400).send({
            message: 'Invalid near me query',
            context: 'Failed initial near me query checks'
        });
    };
    // Construct the query according to these search parameters
    queryString = 'SELECT * FROM venues;';
    // Query the database
    pool.query(queryString, (error, result) => {
        if (error) {
            res.status(500).send({
                message: error.stack,
                context: 'Failed database query'
            })
        };
        res.status(200).send({
            nearMeQuery,
            nearMeResults: _.sampleSize(result.rows, 8)
        });
    });
};

module.exports = {
    searchHandler,
    nearMeHandler
};