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
    ), secondary_tags AS (
        SELECT
            vt.venue_id,
            string_agg(tag, ', ') AS tags
        FROM
            venue_tags AS vt
        LEFT JOIN
            tags AS t
        ON
            vt.tag_id = t.tag_id
        WHERE
            venue_id IN (SELECT venue_id FROM relevant_venues)
        GROUP BY
	        venue_id
    )
    SELECT
        *
    FROM
        venues
        LEFT JOIN
            secondary_tags
        ON
            secondary_tags.venue_id = venues.venue_id
    WHERE
        venues.venue_id IN (SELECT venue_id FROM relevant_venues)
    ORDER BY
        name
`

const nearMeSearchString = `
    WITH venues_distanced AS (
        SELECT
            *,
            ( 3959 * acos( cos( radians(lat) ) * cos( radians(%L) ) * cos( radians(lon) - radians(%L) ) + sin( radians(lat) ) * sin( radians(%L) ))) AS distance
        FROM
            venues
    ), secondary_tags AS (
        SELECT
            vt.venue_id,
            string_agg(tag, ', ') AS tags
        FROM
            venue_tags AS vt
        LEFT JOIN
            tags AS t
        ON
            vt.tag_id = t.tag_id
        GROUP BY
	        venue_id
    )
    SELECT
        *
    FROM
        venues_distanced
        LEFT JOIN
            secondary_tags
        ON
            venues_distanced.venue_id = secondary_tags.venue_id
    ORDER BY
        distance
    LIMIT
        5
`

module.exports = { tagSearchString, nearMeSearchString }