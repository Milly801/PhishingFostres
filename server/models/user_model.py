from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Index
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import DateTime,Text
from server.models.base import Base
from server.models.utils import get_uuid
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'

    id = Column(String, default=get_uuid)
    user_name = Column(String, nullable=True)
    auth0_id = Column(String, primary_key=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    __table_args = (
        Index('idx_users_email', 'email'),
        Index('idx_users_auth0_id', 'auth0_id')
    )

    def __str__(self):
        return (
            f"auth_id: {self.auth0_id}\n"
            f"user_id: {self.id}\n"
            f"user_name : {self.user_name}\n"
            f"email: {self.email}\n"
            )

    def __repr__(self):
        return f"<User(id={self.id}, user_name={self.user_name}, email={self.email})>"

    responses = relationship('UserResponse', back_populates='user', cascade='all, delete-orphan')
