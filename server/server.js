const express = require('express');
const { Pool } = require('pg');
const _ = require('lodash');

const results = require('./sampleData/sampleResults.js');
const sampleResults = _.sampleSize(results, 9);

const app = express();
const port = 4000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'roobie',
    password: 'ryan',
    port: 5432,
});

app.get('/search', (req, res) => {
    const searchQuery = {
        occasion: req.query.occasion,
        style: req.query.style,
        ambience: req.query.ambience
    };
    pool.query('SELECT * FROM venues', (error, result) => {
        if (error) {
            throw error 
        }
        res.send({
            searchQuery,
            results: sampleResults,
            data: result.rows
        });
    });
});

app.get('/nearme', (req, res) => {
    const searchQuery = {
        lat: req.query.lat,
        lon: req.query.lon
    };
    pool.query('SELECT * FROM venues', (error, result) => {
        if (error) {
            throw error 
        }
        res.send({
            searchQuery,
            results: sampleResults,
            data: result.rows
        });
    });
});

app.listen(port, () => {
    console.log('-> Server started...')
})