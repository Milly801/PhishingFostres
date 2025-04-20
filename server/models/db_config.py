from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from models.base import Base
from models.emailscenario_model import EmailScenario
from models.user_model import User
import pandas as pd
import re

load_dotenv()

connection_str = os.environ.get('DB_URL')
engine = create_engine(connection_str)
DBSession = sessionmaker(bind=engine)

ph_session = DBSession()

Base.metadata.create_all(engine)

if __name__ == "__main__":
    try:
        with engine.connect() as connection:
            print('Sucessfully connected to the cloud postgresql')
            connection.close()
    except Exception as e:
        print(f'Failed to connect to to cloud db: {e}')


"""seeding
csv_file = "models/data.csv"
df = pd.read_csv(csv_file)

df = df.head(200)

def extract_sender_deets(sender):
    if not isinstance(sender, str):
        return None, None
    match = re.match(r"^(.*)\s*<(.+)>$", sender)
    if match:
        return match.group(1).strip(), match.group(2).strip()
    return sender.strip(), None

df["sender_name"], df["sender_email"] = zip(*df["SENDER"].apply(extract_sender_deets))
df.rename(columns={
    "SUBJECT": "subject",
    "RECEIVER":"receiver_email",
    "BODY": "body",
    "LABEL": "is_phishing"
}, inplace=True)

try:
    for _, row in df.iterrows():
        if not row["sender_email"]:
            print(f"Skipping row due to null sender_email: {row}")
            continue

        email_scenario = EmailScenario(
            sender_email = row["sender_email"],
            sender_name = row["sender_name"],
            subject=row["subject"],
            receiver_email= row["receiver_email"],
            body = row["body"],
            is_phishing = row["is_phishing"],
        )
        ph_session.add(email_scenario)
    ph_session.commit()
    print("Data successfully inserted into the database.")
except Exception as e:
    ph_session.rollback()
    print(f"An error occurred: {e}")
finally:
    ph_session.close()
"""
