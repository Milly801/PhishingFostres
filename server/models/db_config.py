from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from server.models.base import Base

load_dotenv()

connection_str = os.environ.get('DB_URL')
engine = create_engine(connection_str)

try:
    with engine.connect() as connection:
        print('Successfully connected to the cloud PostgreSQL')
except Exception as e:
    print(f'Failed to connect to the cloud DB: {e}')

DBSession = sessionmaker(bind=engine)
ph_session = DBSession()

# this is for creating the tables in the database
if __name__ == "__main__":
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    print("successfully!")