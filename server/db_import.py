import pandas as pd
from sqlalchemy import create_engine

filepath_venues = './dbImports/venues.xlsx'
table_venues = pd.read_excel(filepath_venues)

engine = create_engine('postgresql://postgres:ryan@localhost:5432/roobie')

table_venues.to_sql('venues', engine, if_exists="append", index=False)