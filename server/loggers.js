const format = require('pg-format');

const logQuery = (queryType, queryObject, pool) => {
    // Construct the logging query
    if (queryType == 'search') {
        const rawString = `
            INSERT INTO logs__queries (
                timestamp,
                query_type,
                search_string
            ) VALUES (
                current_timestamp,
                'search',
                %L
            )`;
        const queryString = format(rawString, queryObject.searchQuery);
        pool.query(queryString, (error, result) => {
            if (error) {
                console.log(error);
            };
        });
    } else if (queryType == 'nearMe') {
        const rawString = `
        INSERT INTO logs__queries (
            timestamp,
            query_type,
            user_lat,
            user_lon
        ) VALUES (
            current_timestamp,
            'nearMe',
            %L,
            %L
        )`
        const queryString = format(rawString, queryObject.lat, queryObject.lon);
        pool.query(queryString, (error, result) => {
            if (error) {
                console.log(error);
            };
        });
    };
};

module.exports = {
    logQuery
};