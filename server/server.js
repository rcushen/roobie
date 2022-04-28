const express = require('express');
const _ = require('lodash');

const results = require('./sampleData/sampleResults.js');
const sampleResults = _.sampleSize(results, 9);

const app = express();
const port = 4000;

app.get('/search', (req, res) => {
    const query = {
        occasion: req.query.occasion,
        style: req.query.style,
        ambience: req.query.ambience
    };
    res.send({
        query,
        results: sampleResults
    });
})

app.get('/nearme', (req, res) => {
    const query = {
        lat: req.query.lat,
        lon: req.query.lon
    };
    res.send({
        query,
        results: sampleResults
    })
});

app.listen(port, () => {
    console.log('-> Server started...')
})