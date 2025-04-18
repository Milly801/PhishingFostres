from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import DateTime
from .base import Base

class User(Base):
    __tablename__ = 'Users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hashed = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, onupdate=func.now(), nullable=False)

def __repr__(self):
    return f"<User(id={self.id}, user_name={self.user_name}, email={self.email})>"

