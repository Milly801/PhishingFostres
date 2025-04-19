from sqlalchemy.exc import NoResultFound
from server.models.user_model import User
from server.models.db_config import ph_session

class UserRepository:
    def __init__(self, db_session=ph_session): 
        self.db_session = db_session

    def create_user(self, user_data: dict):
        new_user = User(**user_data)
        self.db_session.add(new_user)
        self.db_session.commit()
        return new_user

    def get_user_by_id(self, user_id: int):
        try:
            user = self.db_session.query(User).filter_by(id=user_id).one()
            return user
        except NoResultFound:
            return None

    def get_user_by_email(self, email: str):
        try:
            user = self.db_session.query(User).filter_by(email=email).one()
            return user
        except NoResultFound:
            return None

    def update_user(self, user_id: int, updated_data: dict):
        user = self.get_user_by_id(user_id)
        if user:
            for key, value in updated_data.items():
                setattr(user, key, value)
            self.db_session.commit()
            return user
        return None

    def delete_user(self, user_id: int):
        user = self.get_user_by_id(user_id)
        if user:
            self.db_session.delete(user)
            self.db_session.commit()
            return True
        return False