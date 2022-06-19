import sys
import pandas as pd
import sqlalchemy as db

# Define helper functions
def update(args):
    if args == ['-a']:
        # Read in the datafiles
        print('Reading in datafiles...')
        venues = pd.read_csv('./imports/The Database - Venues.csv', parse_dates=['date_added'])
        to_actual_bool = lambda x: True if x == 't' else False
        venues['is_new'] = venues['is_new'].map(to_actual_bool)
        venues['has_smoking_area'] = venues['has_smoking_area'].map(to_actual_bool)

        venue_tags = pd.read_csv('./imports/The Database - Venue Tags.csv', skiprows=1)
        venue_tags = pd.melt(venue_tags, id_vars='name', var_name='tag', value_name='applies')
        venue_tags = venue_tags.loc[venue_tags['applies'].notnull(), ['name', 'tag']].sort_values(by='name')

        tags = pd.read_csv('./imports/The Database - Tags.csv')

        # Update the database
        update_database(venues, tags, venue_tags)
    else:
        raise Exception('You are not using the --update command properly')


def delete(args):
    if len(args) > 0:
        delete_from_database(args)
    else:
        raise Exception('You are not using the --delete command properly')

##################################################

# Define the main functions
def update_database(venues, tags, venue_tags):

    # Connect to database
    print('Connecting to database...')
    engine = db.create_engine('postgresql://postgres:ryan@localhost:5432/roobie')
    conn = engine.connect()
    metadata = db.MetaData()

    table__venues = db.Table('data__venues', metadata, autoload_with=engine)
    table__venue_tags = db.Table('data__venue_tags', metadata, autoload_with=engine)
    table__tags = db.Table('data__tags', metadata, autoload_with=engine)

    # 1. UPDATE VENUES TABLE
    # Get existing venues
    print('Updating venues table...')
    existing_venue_names = conn.execute(db.select(table__venues.c.name))
    existing_venue_names = [tup[0] for tup in existing_venue_names]
    
    # Sort venues into those to add and those to update
    venues_to_add = venues[~venues['name'].isin(existing_venue_names)].to_dict('records')
    venues_to_update = venues[venues['name'].isin(existing_venue_names)].to_dict('records')

    # Update the venues to be updated
    for venue in venues_to_update:
        update_stmt = (
            db.update(table__venues).
            where(table__venues.c.name == venue['name']).
            values(venue)
        )
        conn.execute(update_stmt)

    # Add the venues to be added
    for venue in venues_to_add:
        insert_stmt = (
            db.insert(table__venues).
            values(venue)
        )
        conn.execute(insert_stmt)

    # 2. UPDATE TAGS TABLE
    print('Updating tags table...')
    # Empty the table
    delete_stmt = (
        db.delete(table__tags)
    )
    conn.execute(delete_stmt)

    # Insert all of the tags
    for tag in tags.to_dict('records'):
        insert_stmt = (
            db.insert(table__tags).
            values(tag)
        )
        conn.execute(insert_stmt)

    # 3. UPDATE VENUE TAGS TABLE
    print('Updating venue tags table...')
    # Get newly-existing venues
    existing_venues = conn.execute(db.select(table__venues.c.venue_id, table__venues.c.name))
    existing_venues = [tup for tup in existing_venues]
    existing_venues_df = pd.DataFrame.from_records(existing_venues, columns=['venue_id', 'name'])

    # Check that we aren't trying to update tags for venues which don't exist
    existing_venue_names = existing_venues_df['name'].tolist()
    for venue in venue_tags['name'].unique().tolist():
        if venue not in existing_venue_names:
            raise Exception('You are trying to update the tags for a venue ({}) which is not in the database!'.format(venue))
    
    # Get the tag mapping
    tags = conn.execute(db.select(table__tags.c.tag_id, table__tags.c.tag))
    tags = [tup for tup in tags]
    tags_df = pd.DataFrame.from_records(tags, columns=['tag_id', 'tag'])

    # Create the updated venue_tags table
    updated_venue_tags = venue_tags.merge(tags_df, how='left', on='tag').merge(existing_venues_df, how='left', on='name')
    updated_venue_tags = updated_venue_tags[['venue_id', 'tag_id']]

    # Empty the existing venue_tags table
    delete_stmt = (
        db.delete(table__venue_tags)
    )
    conn.execute(delete_stmt)

    for tag in updated_venue_tags.to_dict('records'):
        insert_stmt = (
            db.insert(table__venue_tags).
            values(tag)
        )
        conn.execute(insert_stmt)

    print('...done!')

def delete_from_database(venue_names):
    
    # Connect to database
    engine = db.create_engine('postgresql://postgres:ryan@localhost:5432/roobie')
    conn = engine.connect()
    metadata = db.MetaData()

    table__venues = db.Table('data__venues', metadata, autoload_with=engine)
    table__venue_tags = db.Table('data__venue_tags', metadata, autoload_with=engine)

    # Get existing venues
    existing_venues = conn.execute(db.select(table__venues.c.venue_id, table__venues.c.name))
    existing_venues = [tup for tup in existing_venues]
    existing_venues_df = pd.DataFrame.from_records(existing_venues, columns=['venue_id', 'name'])

    # Check that venues are actually in the database
    for venue in venue_names:
        if venue not in existing_venues_df['name'].tolist():
            raise Exception('You are trying to delete a venue ({}) that is not in the database!'.format(venue))

    # 1. DELETE FROM VENUES TABLE
    print('Deleting from venues table...')
    for venue in venue_names:
        delete_stmt = (
            db.delete(table__venues).
            where(table__venues.c.name == venue)
        )
        conn.execute(delete_stmt)
    
    # 2. DELETE FROM VENUE TAGS TABLE
    print('Deleting from venue tags table...')
    for venue in venue_names:
        venue_id = existing_venues_df.loc[existing_venues_df['name'] == venue, 'venue_id'].values[0]
        venue_id = int(venue_id)
        delete_stmt = (
            db.delete(table__venue_tags).
            where(table__venue_tags.c.venue_id == venue_id)
        )
        conn.execute(delete_stmt)

    print('...done!')

########################################

# Load in command line arguments
args = sys.argv[1:]

# Check that arguments have been provided
if len(args) == 1:
    raise Exception('No arguments provided!')

# Execute the appropriate dbUtils.py function
if args[0] in ['-u', '--update']:
    update(args[1:])
elif args[0] in ['-d', '--delete']:
    delete(args[1:])
else:
    raise Exception('Unsupported case!')