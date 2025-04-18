from server.models.db_config import ph_session
from server.models.user_model import User
from datetime import datetime




def insert_dummy_user():
    try:
        existing_user = ph_session.query(User).filter_by(email="johndoe@example.com").first()
        if existing_user:
            print("Dummy user already exists!")
            return
        dummy_user = User(
            user_name="John Doe",
            email="johndoe@example.com",
            password_hashed="hashed_password",
            updated_at=datetime.utcnow()  
        )
        ph_session.add(dummy_user)
        ph_session.commit()
        print("Dummy user inserted successfully!")
    except Exception as e:
        ph_session.rollback()
        print(f"Error inserting dummy user: {e}")
    finally:
        ph_session.close()