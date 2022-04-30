const express = require('express');

const { searchHandler, nearMeHandler } = require('./requestHandlers')

const app = express();
const port = 4000;

app.get('/search', searchHandler);

app.get('/nearme', nearMeHandler);

app.listen(port, () => {
    console.log('-> Server started...')
});