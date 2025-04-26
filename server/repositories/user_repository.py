from sqlalchemy.exc import NoResultFound
from server.models.user_model import User
from server.models.db_config import ph_session
from sqlalchemy.future import select
import asyncio

class UserRepository:
    def __init__(self, db_session=ph_session):
        self.db_session = db_session

    async def create_user(self, user: User, check_existing=False):
        try:
            if check_existing:
                result = self.db_session.execute(select(User).where(User.email == user.email))
                existing_user = result.scalars().first()
                if existing_user:
                    return existing_user
            new_user = User(**user)
            self.db_session.add(new_user)
            self.db_session.commit()
            return new_user
        except Exception as e:
            print(f"Error creating user: {e}")
            self.db_session.rollback()
            raise e

    async def get_all_users(self):
        result = self.db_session.execute(select(User))
        all_users = result.scalars().all()
        for user in all_users:
            print(str(user))

    async def get_user_by_id(self, user_id: str):
        try:
            result = self.db_session.execute(select(User).where(User.id == user_id))
            existing_user = result.scalars().first()
            return existing_user
        except NoResultFound:
            return None

    async def get_user_by_email(self, email: str):
        try:
            result = self.db_session.execute(select(User).where(User.email == email))
            existing_user = result.scalars().first()
            return result
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