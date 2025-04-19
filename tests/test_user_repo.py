import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.models.base import Base
from server.models.user_model import User
from server.repositories.user_repository import UserRepository

#// this creates a temp db that get destroyed soon test are done
@pytest.fixture(scope="module")
def test_session():
    # Create an in-memory SQLite database
    engine = create_engine("sqlite:///:memory:")  # In-memory database
    Session = sessionmaker(bind=engine)
    session = Session()

   
    Base.metadata.create_all(engine)

    yield session

    # close down the database
    session.close()


@pytest.fixture
def user_repo(test_session):
    return UserRepository(test_session)


def test_create_user(user_repo):
    user_data = {
        "user_name": "Test User",
        "email": "testuser@example.com",
        "password_hashed": "hashed"
    }
    new_user = user_repo.create_user(user_data)
    assert new_user.id is not None
    assert new_user.email == "testuser@example.com"
    assert new_user.user_name == "Test User"


def test_get_user_by_id(user_repo):
    user_data = {
        "user_name": "Second User",
        "email": "seconduser@example.com",
        "password_hashed": "password_example"
    }
    user = user_repo.create_user(user_data)
    retrieved_user = user_repo.get_user_by_id(user.id)
    assert retrieved_user is not None
    assert retrieved_user.email == "seconduser@example.com"

def test_update_user(user_repo):
    user_data = {
        "user_name": "Update Me",
        "email": "updateme@example.com",
        "password_hashed": "example"
    }
    user = user_repo.create_user(user_data)
    updated_data = {"user_name": "Updated Name"}
    updated_user = user_repo.update_user(user.id, updated_data)
    assert updated_user.user_name == "Updated Name"


def test_delete_user(user_repo):
    user_data = {
        "user_name": "Delete Me",
        "email": "deleteme@example.com",
        "password_hashed": "password"
    }
    user = user_repo.create_user(user_data)
    is_deleted = user_repo.delete_user(user.id)
    assert is_deleted is True
    deleted_user = user_repo.get_user_by_id(user.id)
    assert deleted_user is None
