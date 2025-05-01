from sqlalchemy.exc import NoResultFound
from server.models.user_model import User
from server.models.db_config import ph_session, DBSession
from sqlalchemy.future import select
import asyncio

class UserRepository:
    def __init__(self):
        self.db_session = DBSession()

    def create_user(self, user: User, check_existing=False):
        try:
            print(f"[DEBUG] Attempting to create user with data: {user}")
            if check_existing:
                print(f"[DEBUG] Checking if user with email {user['email']} exists")
                result = self.db_session.execute(select(User).where(User.email == user['email']))
                existing_user = result.scalars().first()
                if existing_user:
                    print(f"[DEBUG] User already exists: {existing_user}")
                    return existing_user
            new_user = User(**user)
            self.db_session.add(new_user)
            print(f"[DEBUG] New user added to session: {new_user}")
            self.db_session.commit()
            print(f"[DEBUG] User committed to DB: {new_user}")
            return new_user
        except Exception as e:
            print(f"[ERROR] Error creating user: {e}")
            self.db_session.rollback()
            raise e

    def get_all_users(self):
        result = self.db_session.execute(select(User))
        all_users = result.scalars().all()
        for user in all_users:
            print(str(user))

    def get_user_by_id(self, user_id: str):
        try:
            result = self.db_session.execute(select(User).where(User.id == user_id))
            existing_user = result.scalars().first()
            return existing_user
        except NoResultFound:
            return None

    def get_user_by_email(self, email: str):
        try:
            result = self.db_session.execute(select(User).where(User.email == email))
            existing_user = result.scalars().first()
            return existing_user
        except NoResultFound:
            return None

    def update_user(self, user_id: str, updated_data: dict):
        try:
            user = self.get_user_by_id(user_id)
            if user:
                for key, value in updated_data.items():
                    setattr(user, key, value)
                self.db_session.commit()
                return user
            return None
        except Exception as e:
            self.db_session.rollback()
            raise e

    def delete_user(self, user_id: str):
        try:
            print(f"Attempting to delete user with ID: {user_id}")
            user = self.get_user_by_id(user_id)
            if user:
                print(f"User found: {user}")
                self.db_session.delete(user)
                self.db_session.commit()
                print(f"User deleted successfully.")
                return True
            return False
        except Exception as e:
            self.db_session.rollback()
            raise e


"""
async def test_repository():
    test_instance = UserRepository()
    all_users = await test_instance.get_all_users()
    print(all_users)

asyncio.run(test_repository())
"""