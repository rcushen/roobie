const tagSearchString = `
    WITH relevant_venues AS (
        SELECT
            l.venue_id
        FROM
            data__tags AS t
            INNER JOIN
                data__venue_tags AS l
            ON t.tag_id = l.tag_id
        WHERE
            t.type = 'Primary' AND
            t.tag IN (%L)
        GROUP BY
            l.venue_id
        HAVING
            COUNT(l.tag_id) = %L
    ), primary_tags AS (
        SELECT
            vt.venue_id,
            string_agg(t.tag, ', ') AS primary_tags
        FROM
            data__venue_tags AS vt
            LEFT JOIN
                data__tags AS t
            ON
                vt.tag_id = t.tag_id
        WHERE
            vt.venue_id IN (SELECT venue_id FROM relevant_venues) AND
            t.type = 'Primary'
        GROUP BY
	        vt.venue_id
    ), secondary_tags AS (
        SELECT
            vt.venue_id,
            string_agg(t.tag, ', ') AS secondary_tags
        FROM
            data__venue_tags AS vt
            LEFT JOIN
                data__tags AS t
            ON
                vt.tag_id = t.tag_id
        WHERE
            vt.venue_id IN (SELECT venue_id FROM relevant_venues) AND
            t.type = 'Secondary'
        GROUP BY
	        vt.venue_id
    )
    SELECT
        *
    FROM
        data__venues AS v
        LEFT JOIN
            primary_tags
        ON
            primary_tags.venue_id = v.venue_id
        LEFT JOIN
            secondary_tags
        ON
            secondary_tags.venue_id = v.venue_id
    WHERE
        v.venue_id IN (SELECT venue_id FROM relevant_venues)
    ORDER BY
        name
`

const nearMeSearchString = `
    WITH venues_distanced AS (
        SELECT
            *,
            ( 3959 * acos( cos( radians(lat) ) * cos( radians(%L) ) * cos( radians(lon) - radians(%L) ) + sin( radians(lat) ) * sin( radians(%L) ))) AS distance
        FROM
            data__venues
    ), primary_tags AS (
        SELECT
            vt.venue_id,
            string_agg(tag, ', ') AS primary_tags
        FROM
            data__venue_tags AS vt
            LEFT JOIN
                data__tags AS t
            ON
                vt.tag_id = t.tag_id
        WHERE
            t.type = 'Primary'
        GROUP BY
	        venue_id
    ), secondary_tags AS (
        SELECT
            vt.venue_id,
            string_agg(tag, ', ') AS secondary_tags
        FROM
            data__venue_tags AS vt
            LEFT JOIN
                data__tags AS t
            ON
                vt.tag_id = t.tag_id
        WHERE
            t.type = 'Secondary'
        GROUP BY
	        venue_id
    )
    SELECT
        *
    FROM
        venues_distanced AS vd
        LEFT JOIN
            primary_tags
        ON
            primary_tags.venue_id = vd.venue_id
        LEFT JOIN
            secondary_tags
        ON
            secondary_tags.venue_id = vd.venue_id
    ORDER BY
        distance
    LIMIT
        5
`

module.exports = { tagSearchString, nearMeSearchString }