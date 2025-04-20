from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import DateTime,Text
from models.base import Base
from models.utils import get_uuid

class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True, default=get_uuid)
    user_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hashed = Column(Text, unique=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)


    def __str__(self):
        return (
            f"user_id: {self.id}\n"
            f"user_name : {self.user_name}\n"
            f"email: {self.email}\n"
            )

    def __repr__(self):
        return f"<User(id={self.id}, user_name={self.user_name}, email={self.email})>"
