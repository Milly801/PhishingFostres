from server.models.db_config import ph_session
from server.models.user_model import User
from datetime import datetime
from typing import List, Optional
from sqlalchemy.exc import SQLAlchemyError


class UserRepository:
    def __init__(self):
        self.session = ph_session

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        try:
            return self.session.query(User).filter_by(id=user_id).first()
        except SQLAlchemyError as e:
            print(f"Error retrieving user by ID: {e}")
            raise e
        
    def get_user_by_email(self, email: str) -> Optional[User]:
        try:
            return self.session.query(User).filter_by(email=email).first()
        except SQLAlchemyError as e:
            print(f"Error retrieving user by email: {e}")
            raise e
        
    def get_all_users(self) -> List[User]:
        try:
            return self.session.query(User).all()
        except SQLAlchemyError as e:
            print(f"Error retrieving all users: {e}")
            raise e

    def update_user(self, user_id: int, user_name: Optional[str] = None, email: Optional[str] = None) -> Optional[User]:
        try:
            user = self.get_user_by_id(user_id)
            if user:
                if user_name:
                    user.user_name = user_name
                if email:
                    user.email = email
                user.updated_at = datetime.utcnow()
                self.session.commit()
                print("User updated successfully!")
                return user
            else:
                print("User not found!")
                return None
        except SQLAlchemyError as e:
            self.session.rollback()
            print(f"Error updating user: {e}")
            raise e

    def delete_user(self, user_id: int) -> bool:
        try:
            user = self.get_user_by_id(user_id)
            if user:
                self.session.delete(user)
                self.session.commit()
                print("User deleted successfully!")
                return True
            else:
                print("User not found!")
                return False
        except SQLAlchemyError as e:
            self.session.rollback()
            print(f"Error deleting user: {e}")
            raise e

    def user_exists_by_email(self, email: str) -> bool:
        try:
            return self.session.query(User).filter_by(email=email).first() is not None
        except SQLAlchemyError as e:
            print(f"Error checking if user exists by email: {e}")
            raise e


if __name__ == "__main__":
    repo = UserRepository()
    user = repo.get_user_by_id(1)
    print(f"Retrieved user: {user}")

    user_by_email = repo.get_user_by_email("janedoe@example.com")
    print(f"Retrieved user by email: {user_by_email}")

    all_users = repo.get_all_users()
    print(f"All users: {all_users}")

    updated_user = repo.update_user(1, user_name="Jane Smith")
    print(f"Updated user: {updated_user}")

    exists = repo.user_exists_by_email("janedoe@example.com")
    print(f"User exists: {exists}")

    deleted = repo.delete_user(1)
    print(f"User deleted: {deleted}")
