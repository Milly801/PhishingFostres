from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

connection_str = os.environ.get('DB_URL')
engine = create_engine(connection_str)

try:
    with engine.connect() as connection:
        print('Sucessfully connected to the cloud postgresql')
        connection.close()
except Exception as e:
    print(f'Failed to connect to to cloud db: {e}')

DBSession = sessionmaker(bind=engine)

ph_session = DBSession()