from sqlalchemy.exc import NoResultFound
from models.user_model import User
from models.db_config import ph_session

class UserRepository:
    def __init__(self, db_session=ph_session):
        self.db_session = db_session

    def create_user(self, user_data: dict):
        new_user = User(**user_data)
        self.db_session.add(new_user)
        self.db_session.commit()
        return new_user

    def get_all_users(self):
        return self.db_session.query(User).all()

    def get_user_by_id(self, user_id: str):
        try:
            user = self.db_session.query(User).filter_by(id=user_id).first()
            return user
        except NoResultFound:
            return None

    def get_user_by_email(self, email: str):
        try:
            user = self.db_session.query(User).filter_by(email=email).first()
            return user
        except NoResultFound:
            return None

    def update_user(self, user_id: str, updated_data: dict):
        user = self.get_user_by_id(user_id)
        if user:
            for key, value in updated_data.items():
                setattr(user, key, value)
            self.db_session.commit()
            return user
        return None

    def delete_user(self, user_id: str):
        print(f"Attempting to delete user with ID: {user_id}")
        user = self.get_user_by_id(user_id)
        if user:
            print(f"User found: {user}")
            self.db_session.delete(user)
            self.db_session.commit()
            print(f"User deleted successfully.")
            return True
        return False
