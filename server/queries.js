const tagSearchString = `
    WITH relevant_venues AS (
        SELECT
            l.venue_id
        FROM
            tags AS t
            INNER JOIN
                venue_tags AS l
            ON t.tag_id = l.tag_id
        WHERE
            t.type = 'Primary' AND
            t.tag IN (%L)
        GROUP BY
            l.venue_id
        HAVING
            COUNT(l.tag_id) = %L
    )
    SELECT
        *
    FROM
        venues
    WHERE
        venue_id IN (SELECT venue_id FROM relevant_venues)
    ORDER BY
        name
`

module.exports = { tagSearchString }